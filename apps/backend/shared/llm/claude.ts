import { ChatAnthropic } from "@langchain/anthropic";
import { secret } from "encore.dev/config";
import { LLMModel, TokenLimit } from "./const";

const apiKey = secret("AnthropicApiKey");

export function createClaude({ model, maxTokens }: { model: string; maxTokens: number } = { model: LLMModel.Claude.Haiku45, maxTokens: TokenLimit.Detail }) {
  return new ChatAnthropic({
    anthropicApiKey: apiKey(),
    model,
    temperature: 0,
    maxTokens,
    maxRetries: 2,
  });
}