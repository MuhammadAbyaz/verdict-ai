import { model, modelID } from "@/ai/providers";
import { google } from "@ai-sdk/google";
import { createClient } from "@supabase/supabase-js";
import { streamText, UIMessage, embed } from "ai";
import { system_prompt } from "./prompt";
import { scrapeTool, searchTool } from "@/ai/tools";

export const maxDuration = 30;

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const {
    messages,
    selectedModel,
  }: { messages: UIMessage[]; selectedModel: modelID } = await req.json();

  const userMessage = messages[messages.length - 1];
  let contextDocuments = "";

  if (userMessage.role === "user") {
    try {
      const { embedding } = await embed({
        model: google.textEmbeddingModel("text-embedding-004"),
        value: userMessage.content,
      });

      const { data: documents } = await supabase.rpc("match_legal_chunks", {
        query_embedding: embedding,
        match_threshold: 0.8,
        match_count: 5,
      });

      if (documents && documents.length > 0) {
        contextDocuments =
          "Relevant information:\n\n" +
          documents
            .map(
              (doc: any) =>
                `${doc.content} (similarity: ${doc.similarity.toFixed(2)})`
            )
            .join("\n\n");
      }
    } catch (error) {
      console.error("Error embedding query or retrieving documents:", error);
    }
  }
  // console.log("contextDocuments", contextDocuments);

  const systemMessage = contextDocuments
    ? `${system_prompt} Use the following relevant information to answer the user's question:\n\n${contextDocuments}`
    : system_prompt;

  const result = streamText({
    model: model.languageModel(selectedModel),
    system: systemMessage,
    messages,
    tools: { searchTool, scrapeTool },
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
