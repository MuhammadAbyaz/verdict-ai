import { embed } from "ai";
import { google } from "@ai-sdk/google";
export async function GET(req: Request) {
  const { embedding, usage } = await embed({
    model: google.textEmbeddingModel("text-embedding-004"),
    value: "sunny day at the beach",
  });

  return new Response(JSON.stringify({ length: embedding.length, usage }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
