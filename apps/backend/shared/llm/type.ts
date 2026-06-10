
import { ZodType } from "zod";
import { LLMModel, LLMProvider, TokenLimit } from "./const";

export type LLMConfig = { 
    provider: LLMProviders;
    model: LLMModels; 
    maxTokens: LLMTokenLimit; 
    schema?: ZodType;
}

// Recursively retrieve nested objects value if it is a string
type DeepValue<T> = T extends string
    ? T
    : T extends object
    ? DeepValue<T[keyof T]>
    : never;

export type LLMModels = DeepValue<typeof LLMModel>
export type LLMProviders = typeof LLMProvider[keyof typeof LLMProvider];
export type LLMTokenLimit = typeof TokenLimit[keyof typeof TokenLimit];

