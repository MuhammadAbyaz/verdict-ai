import { model, modelID } from "@/ai/providers";
import { google } from "@ai-sdk/google";
import { createClient } from "@supabase/supabase-js";
import { streamText, UIMessage, embed } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY! // Public key, read-only is fine
);

export async function POST(req: Request) {
  const {
    messages,
    selectedModel,
  }: { messages: UIMessage[]; selectedModel: modelID } = await req.json();

  // Get the latest user message
  const userMessage = messages[messages.length - 1];
  let contextDocuments = "";

  if (userMessage.role === "user") {
    try {
      // Generate embedding for the user query
      const { embedding } = await embed({
        model: google.textEmbeddingModel("text-embedding-004"),
        value: userMessage.content,
      });

      // Find matching documents from Supabase
      const { data: documents } = await supabase.rpc("match_legal_chunks", {
        query_embedding: embedding,
        match_threshold: 0.8,
        match_count: 5,
      });

      // If documents are found, add them to the context
      if (documents && documents.length > 0) {
        contextDocuments =
          "Relevant information:\n\n" +
          documents
            .map(
              (doc) =>
                `${doc.content} (similarity: ${doc.similarity.toFixed(2)})`
            )
            .join("\n\n");
      }
    } catch (error) {
      console.error("Error embedding query or retrieving documents:", error);
    }
  }

  // Create a system message with relevant context
  const systemMessage = contextDocuments
    ? `You are a helpful assistant. Use the following relevant information to answer the user's question:\n\n${contextDocuments}`
    : "You are a helpful assistant.";

  const result = streamText({
    model: model.languageModel(selectedModel),
    system: systemMessage,
    messages,
    // tools: {
    //   getWeather: weatherTool,
    // },
    providerOptions: {
      google: {
        thinkingConfig: {
          thinkingBudget: 1024,
        },
      },
    },
  });

  return result.toDataStreamResponse({
    sendReasoning: true,
  });
}
