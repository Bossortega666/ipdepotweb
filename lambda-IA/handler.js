// Importa los módulos en la parte superior del archivo
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

// Instancia del cliente de Bedrock
const client = new BedrockRuntimeClient({
  region: "us-east-1", // Usa tu región habilitada
});

// Exporta la función handler
export const handler = async (event) => {
  try {
    // Parsear body
    const body = JSON.parse(event.body);
    const prompt = body.prompt || "Hola";

    // Comando para invocar el modelo
    const command = new InvokeModelCommand({
      modelId: "anthropic.claude-instant-v1",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        prompt: `\n\nHuman: ${prompt}\n\nAssistant:`,
        max_tokens_to_sample: 200,
      }),
    });

    // Ejecuta el comando
    const response = await client.send(command);

    // Decodifica la respuesta
    const completion = JSON.parse(
      new TextDecoder().decode(response.body)
    );

    // Respuesta exitosa
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        result: completion.completion,
      }),
    };
  } catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error interno en Lambda" }),
    };
  }
};
