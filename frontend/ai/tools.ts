import { tool } from "ai";
import { z } from "zod";
import { tavily } from "@tavily/core";

const tvly = tavily({
  apiKey: process.env.TAVILY_API_KEY,
});

export const weatherTool = tool({
  description: "Get the weather in a location",
  parameters: z.object({
    location: z.string().describe("The location to get the weather for"),
  }),
  execute: async ({ location }) => ({
    location,
    temperature: 72 + Math.floor(Math.random() * 21) - 10,
  }),
});

export const searchTool = tool({
  description: "Search the web for a query",
  parameters: z.object({
    query: z.string().describe("The query to search for"),
  }),
  execute: async ({ query }) => {
    const response = await tvly.search(query, {
      includeAnswer: true,
    });
    console.log("response", response);
    return response;
  },
});

export const scrapeTool = tool({
  description: "Scrape a webpage for information",
  parameters: z.object({
    url: z.string().describe("The URL of the webpage to scrape"),
  }),
  execute: async ({ url }) => {
    const response = await tvly.extract((urls = [url]), {});
    console.log("response", response);
    return response;
  },
});
