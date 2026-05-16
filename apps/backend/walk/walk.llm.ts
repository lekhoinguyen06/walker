import { ActionSchema } from "@repo/core";
import { createClaude, LLMModel, TokenLimit } from "../shared/llm";

const claude = createClaude({ model: LLMModel.Claude.Haiku45, maxTokens: TokenLimit.Detail, schema: ActionSchema });

export default claude;