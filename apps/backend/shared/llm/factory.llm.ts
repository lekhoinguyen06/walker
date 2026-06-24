import { LanguageModel } from 'ai';
import { bedrock } from './bedrock.llm';
import { LLMModel, LLMProvider } from './const.llm';
import { LLMModels, LLMProviders } from './type.llm';

export function factoryLLM(
  provider: LLMProviders,
  model?: LLMModels,
): LanguageModel {
  switch (provider) {
    case LLMProvider.Bedrock:
      return bedrock(model || LLMModel.Bedrock.Gemini.Gemma3['4B']);
    default:
      throw new Error(`Unsupported LLM provider: ${provider}`);
  }
}
