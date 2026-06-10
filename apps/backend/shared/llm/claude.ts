import { ChatAnthropic } from "@langchain/anthropic";
import { secret } from "encore.dev/config";
import { LLMModel, TokenLimit } from "./const";
import { LLMConfig } from "./type";

const apiKey = secret("AnthropicApiKey");

export function createClaude({ model, maxTokens, schema }: Omit<LLMConfig, "provider"> = { model: LLMModel.Claude.Haiku45, maxTokens: TokenLimit.Detail }) {
  const llm = new ChatAnthropic({
    anthropicApiKey: apiKey(),
    model,
    temperature: 0,
    maxTokens,
    maxRetries: 2,
  });
  return schema ? llm.withStructuredOutput(schema) : llm;
}