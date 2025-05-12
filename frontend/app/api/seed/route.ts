import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import fs from "fs/promises";
import path from "path";
import { google } from "@ai-sdk/google";
import { embedMany } from "ai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // needs insert permissions
);

export async function GET(req: Request) {
  try {
    const dir = path.join(process.cwd(), "pdfs");
    const files = await fs.readdir(dir);

    console.log(`Processing ${files.length} PDF files from ${dir}`);

    // Configure the text splitter for optimal RAG chunking
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
      separators: ["\n\n", "\n", ". ", " ", ""],
      keepSeparator: true,
    });

    for (const fileName of files) {
      const filePath = path.join(dir, fileName);
      console.log(`Processing file: ${fileName}`);

      // Use LangChain's PDFLoader to better handle PDF structure
      const loader = new PDFLoader(filePath, {
        splitPages: false, // We'll use our own text splitter for more control
      });

      const docs = await loader.load();
      const text = docs.map((doc) => doc.pageContent).join("\n");

      // Split text using LangChain's RecursiveCharacterTextSplitter
      const chunks = await textSplitter.splitText(text);

      console.log(`Split ${fileName} into ${chunks.length} chunks`);

      // Process chunks in batches to avoid overwhelming the API
      const batchSize = 10;
      for (let i = 0; i < chunks.length; i += batchSize) {
        const batchChunks = chunks.slice(i, i + batchSize);
        console.log(
          `Processing batch ${i / batchSize + 1} of ${Math.ceil(
            chunks.length / batchSize
          )} for file: ${fileName}`
        );

        // Generate embeddings for the batch using Google's embedding model
        const { embeddings, usage } = await embedMany({
          model: google.embedding("text-embedding-004", {
            outputDimensionality: 768,
            taskType: "RETRIEVAL_QUERY",
          }),
          values: batchChunks,
        });

        console.log(
          `Batch ${i / batchSize + 1} embeddings generated. Usage: ${usage}`
        );

        // Insert each chunk with its embedding into Supabase
        for (let j = 0; j < batchChunks.length; j++) {
          await supabase.from("legal_chunks").insert({
            content: batchChunks[j],
            embedding: embeddings[j],
            file_name: fileName,
            chunk_index: i + j,
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "All PDF files processed successfully",
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
