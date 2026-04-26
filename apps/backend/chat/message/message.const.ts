// Scenarios:
// 1. Same topic: 
//    - On 20th msg, summarized oldest 10 msg down to 1 summary, so total 10 msg, summary does not count towards the limit.
//    - On the next occurrence of 20th msg, summarized oldest 10 msg down to 1, so total 10 msg. At this point we 2 summaries.
// 2. Different topics: 
//    - On 20th msg of topic A, summarized oldest 10 msg of topic A down to 1 summary.
//    - Then 20th msg of topic B, at this point we have 10 msg of topic A, 1 summary of topic A and 20 msg of topic B, total 30 msg.
//.   - Topic & Total threshold hit, summarize each previous topic msg, eg. last 10 msg of topic A, now we have 2 summaries of topic A; 20 msg of topic B summarized down to 10 msg, and 1 summary.

export const MessageRole = {
    User: "user",
    Assistant: "assistant",
    System: "system",
} as const;

export const MessageType = {
    Command: "command",
    Question: "question",
    Explain: "explain",
    Answer: "answer",
    Other: "other",
} as const;

export const MessageLimits = {
    // Usage
    MaxTokens: 1000,
    // Lengths
    SummaryThreshold: 10,
    MaxSummary: 3,
    MaxTopic: 20,
    MaxTotal: 30,
} as const;

export const AttachmentType = {
    File: "file",
    Image: "image",
    Code: "code",
    Table: "table",
    Other: "other",
} as const;

// Type exports
export type MessageRoleType = typeof MessageRole[keyof typeof MessageRole];
export type TypeOfMessageType = typeof MessageType[keyof typeof MessageType];
export type MessageLimitsType = typeof MessageLimits[keyof typeof MessageLimits];
export type TypeOfAttachmentType = typeof AttachmentType[keyof typeof AttachmentType];
