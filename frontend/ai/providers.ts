import { groq } from "@ai-sdk/groq";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { google } from "@ai-sdk/google";

const languageModels = {
  "meta-llama/llama-4-scout-17b-16e-instruct": wrapLanguageModel({
    middleware: extractReasoningMiddleware({
      tagName: "think",
    }),
    model: groq("meta-llama/llama-4-scout-17b-16e-instruct"),
  }),
  "deepseek-r1-distill-llama-70b": wrapLanguageModel({
    middleware: extractReasoningMiddleware({
      tagName: "think",
    }),
    model: groq("deepseek-r1-distill-llama-70b"),
  }),
  "qwen-qwq-32b": groq("qwen-qwq-32b"),
  "gemini-2.5-pro-preview-05-06": wrapLanguageModel({
    middleware: extractReasoningMiddleware({
      tagName: "think",
    }),
    model: google("gemini-2.5-flash-preview-04-17"),
  }),
};

export const model = customProvider({
  languageModels,
});

export type modelID = keyof typeof languageModels;

export const MODELS = Object.keys(languageModels);

export const defaultModel: modelID =
  "meta-llama/llama-4-scout-17b-16e-instruct";
