// ==== Dependencies ====
const {
  BedrockRuntimeClient,
  InvokeModelCommand,
} = require("@aws-sdk/client-bedrock-runtime");

const {
  DynamoDBClient,
  GetItemCommand,
  UpdateItemCommand,
} = require("@aws-sdk/client-dynamodb");

const { TextDecoder } = require("util");

// ==== Clients / Config ====
const bedrock = new BedrockRuntimeClient({ region: "us-east-1" });
const ddb = new DynamoDBClient({ region: "us-east-1" });

const RATE_LIMIT = 5;           // máximo de solicitudes por ventana
const WINDOW_SECONDS = 60;      // duración de la ventana en segundos
const TABLE_NAME = "RateLimitTable";

const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS,POST",
  "Content-Type": "application/json",
};

// ==== Handler ====
exports.handler = async (event) => {
  // CORS preflight
  if (event?.requestContext?.http?.method === "OPTIONS") {
    return { statusCode: 200, headers: HEADERS, body: "" };
  }

  const ip =
    event?.requestContext?.http?.sourceIp ||
    event?.requestContext?.identity?.sourceIp ||
    "unknown";

  const now = Math.floor(Date.now() / 1000);
  const key = { ip: { S: ip } };

  // --- RATE LIMIT ---
  try {
    const rateData = await ddb.send(
      new GetItemCommand({
        TableName: TABLE_NAME,
        Key: key,
        ConsistentRead: true,
      })
    );

    let withinWindow = false;
    let currentCount = 0;
    let expiresAt = 0;

    if (rateData.Item) {
      currentCount = parseInt(rateData.Item.count?.N ?? "0", 10);
      expiresAt = parseInt(rateData.Item.expiresAt?.N ?? "0", 10);
      withinWindow = now < expiresAt;
    }

    // Si la ventana está activa y ya superó el límite -> 429
    if (withinWindow && currentCount >= RATE_LIMIT) {
      return {
        statusCode: 429,
        headers: HEADERS,
        body: JSON.stringify({
          error: "Rate limit exceeded. Intenta más tarde.",
        }),
      };
    }

    // Actualización atómica:
    // - Si no existe o ya expiró, reiniciamos contador y expiración.
    // - Si sigue vigente, incrementamos únicamente el contador.
    if (!rateData.Item || !withinWindow) {
      await ddb.send(
        new UpdateItemCommand({
          TableName: TABLE_NAME,
          Key: key,
          UpdateExpression: "SET #c = :one, expiresAt = :exp",
          ExpressionAttributeNames: { "#c": "count" },
          ExpressionAttributeValues: {
            ":one": { N: "1" },
            ":exp": { N: String(now + WINDOW_SECONDS) },
          },
          ReturnValues: "ALL_NEW",
        })
      );
    } else {
      await ddb.send(
        new UpdateItemCommand({
          TableName: TABLE_NAME,
          Key: key,
          UpdateExpression: "SET #c = #c + :incr",
          ExpressionAttributeNames: { "#c": "count" },
          ExpressionAttributeValues: { ":incr": { N: "1" } },
          ReturnValues: "UPDATED_NEW",
        })
      );
    }
  } catch (limitError) {
    console.error("Error en rate limiting:", limitError);
    // Si Dynamo falla, no bloqueamos al usuario: dejamos continuar.
  }

  // --- BEDROCK ---
  try {
    let prompt = "Hola";
    try {
      const body = event?.body ? JSON.parse(event.body) : {};
      if (body?.prompt && typeof body.prompt === "string") {
        prompt = body.prompt;
      }
    } catch {
      // body inválido -> usamos prompt por defecto
    }

    const command = new InvokeModelCommand({
      modelId: "anthropic.claude-v2:1", // deja el ID que ya estás usando
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        prompt: `\n\nHuman: ${prompt}\n\nAssistant:`,
        max_tokens_to_sample: 200,
      }),
    });

    const response = await bedrock.send(command);
    const decoded = new TextDecoder().decode(response.body);
    const completion = JSON.parse(decoded);

    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify({ result: completion.completion }),
    };
  } catch (err) {
    console.error("Error en Bedrock:", err);
    return {
      statusCode: 500,
      headers: HEADERS,
      body: JSON.stringify({ error: "Error interno en Lambda" }),
    };
  }
};
