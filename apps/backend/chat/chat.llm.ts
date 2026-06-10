import { createClaude, createLLM, LLMModel, LLMProvider, TokenLimit } from "../shared/llm";
import z from "zod";

const llm = createLLM({ provider: LLMProvider.Bedrock, model: LLMModel.Bedrock.Gemini.Gemma3["12B"], maxTokens: TokenLimit.Concise });

const llmBoolean = createLLM({ provider: LLMProvider.Bedrock, model: LLMModel.Bedrock.Gemini.Gemma3["12B"], maxTokens: TokenLimit.Concise, schema: z.boolean() });

export { llm, llmBoolean };