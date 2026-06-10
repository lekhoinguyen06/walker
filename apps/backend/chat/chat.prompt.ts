export type PromptChatHistory = { role: string, content: string}[];

export function buildPrompt(history: PromptChatHistory): string {
    return `
<description>
    <li>You are an assistant helping user answer questions.</li>
</description>
<requirement>
    <li>You must answer the question based on the conversation history.</li>
    <li>If you don't know the answer, just say you don't know, don't try to make up an answer.</li>
</requirement>
<history>
    ${JSON.stringify(history)}
</history>
`;
}

export function buildGuardrailPrompt(message: string): string {
    return `
<guardrail>
    <li>You must not answer questions that are harmful, unethical, or illegal.</li>
</guardrail>
<message>
    ${message}
</message>
`;
}