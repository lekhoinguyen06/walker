export const TokenLimit = {
    Concise: 250,
    Detail: 500,
    Thorough: 1000,
    Rigorous: 2000,
} as const;

export const LLMModel = {
    Claude: {
        Haiku45: "claude-haiku-4-5",
    }
} as const;