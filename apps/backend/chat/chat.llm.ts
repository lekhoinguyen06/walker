import { createClaude, LLMModel, TokenLimit } from "../shared/llm";
import z from "zod";

const claude = createClaude({ model: LLMModel.Claude.Haiku45, maxTokens: TokenLimit.Detail });

const claudeBoolean = createClaude({ model: LLMModel.Claude.Haiku45, maxTokens: TokenLimit.Concise, schema: z.boolean() });

export {claude, claudeBoolean};