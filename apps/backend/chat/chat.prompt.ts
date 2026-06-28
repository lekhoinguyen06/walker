export function buildPrompt({
  history,
  prompt,
}: {
  history: string;
  prompt: string;
}): string {
  return `
<description>
    <li>You are an assistant helping user answer questions.</li>
</description>
<history>
    ${history}
</history>
<prompt>
    ${prompt}
</prompt>
`;
}

export function buildShouldWalkPrompt({
  history,
  prompt,
}: {
  history: string;
  prompt: string;
}): string {
  return `
<description> 
    <li>You are a decider that determines if the conversation indicates the user need helps guiding on the website.</li>
</description>
<history>
    ${history}
</history>
<prompt>
    ${prompt}
</prompt>
`;
}
