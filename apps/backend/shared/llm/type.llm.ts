import { LLMModel, LLMProvider, TokenLimit } from './const.llm';

// Recursively retrieve nested objects value if it is a string
type DeepValue<T> = T extends string
  ? T
  : T extends object
    ? DeepValue<T[keyof T]>
    : never;

export type LLMModels = DeepValue<typeof LLMModel>;
export type LLMProviders = (typeof LLMProvider)[keyof typeof LLMProvider];
export type LLMTokenLimit = (typeof TokenLimit)[keyof typeof TokenLimit];
