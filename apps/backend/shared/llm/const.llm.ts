export const TokenLimit = {
  Concise: 250,
  Detail: 500,
  Thorough: 1000,
  Rigorous: 2000,
} as const;

export const LLMModel = {
  Claude: {
    Haiku45: 'claude-haiku-4-5',
  },
  Bedrock: {
    Gemini: {
      Gemma3: {
        ['4B']: 'google.gemma-3-4b-it',
        ['12B']: 'google.gemma-3-12b-it',
        ['27B']: 'google.gemma-3-27b-it',
      },
    },
  },
} as const;

export const LLMProvider = {
  Anthropic: 'anthropic',
  Bedrock: 'bedrock',
} as const;
