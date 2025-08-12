const {
  BedrockRuntimeClient,
  InvokeModelCommand,
} = require("@aws-sdk/client-bedrock-runtime");

const {
  DynamoDBClient,
  GetItemCommand,
  UpdateItemCommand,
} = require("@aws-sdk/client-dynamodb");

const bedrock = new BedrockRuntimeClient({ region: "us-east-1" });
const ddb = new DynamoDBClient({ region: "us-east-1" });

const RATE_LIMIT = 5;
const WINDOW_SECONDS = 60;
const TABLE_NAME = "RateLimitTable";

exports.handler = async (event) => {
  const ip =
    event.requestContext?.http?.sourceIp ||
    event.requestContext?.identity?.sourceIp ||
    "unknown";

  const now = Math.floor(Date.now() / 1000);
  const key = { ip: { S: ip } };

  // Rate limiting
  try {
    const rateData = await ddb.send(new GetItemCommand({
      TableName: TABLE_NAME,
      Key: key,
    }));

    if (rateData.Item) {
      const count = parseInt(rateData.Item.count.N);
      const expiresAt = parseInt(rateData.Item.expiresAt.N);

      if (now < expiresAt && count >= RATE_LIMIT) {
        return {
          statusCode: 429,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ error: "Rate limit exceeded. Intenta más tarde." }),
        };
      }
    }

    // Incremento atómico y creación si no existe
    const updateCmd = new UpdateItemCommand({
      TableName: TABLE_NAME,
      Key: key,
      UpdateExpression: `
        SET count = if_not_exists(count, :zero) + :incr,
            expiresAt = if_not_exists(expiresAt, :exp)
      `,
      ExpressionAttributeValues: {
        ":zero": { N: "0" },
        ":incr": { N: "1" },
        ":exp": { N: (now + WINDOW_SECONDS).toString() },
      },
      ReturnValues: "ALL_NEW",
    });

    await ddb.send(updateCmd);
  } catch (limitError) {
    console.error("Error en rate limiting:", limitError);
    // Si falla Dynamo, puedes dejar continuar
  }

  // Ejecutar Bedrock
  try {
    const body = JSON.parse(event.body);
    const prompt = body.prompt || "Hola";

    const command = new InvokeModelCommand({
      modelId: "anthropic.claude-v2:1",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        prompt: `\n\nHuman: ${prompt}\n\nAssistant:`,
        max_tokens_to_sample: 200,
      }),
    });

    const response = await bedrock.send(command);
    const completion = JSON.parse(new TextDecoder().decode(response.body));

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ result: completion.completion }),
    };
  } catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Error interno en Lambda" }),
    };
  }
};
