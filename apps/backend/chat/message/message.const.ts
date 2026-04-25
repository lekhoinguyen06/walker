export const MessageRole = {
    User: "user",
    Assistant: "assistant",
    System: "system",
} as const;

export type MessageRole = typeof MessageRole[keyof typeof MessageRole];