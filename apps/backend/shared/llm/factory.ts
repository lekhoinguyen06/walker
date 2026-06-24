import { createClaude } from "./claude";
import { LLMProvider } from "./const";
import { LLMConfig } from "./type";

export function createLLM(config: LLMConfig) {
    switch(config.provider) {
        case LLMProvider.Anthropic:
            return createClaude(config);
        // case LLMProvider.Bedrock:
        //     return createBedrock(config);
        default:
            throw new Error(`Unsupported LLM provider: ${config.provider}`);
    }
}