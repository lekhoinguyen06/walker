export function buildWalkPrompt({
  history,
  prompt,
}: {
  history: string;
  prompt: string;
}): string {
  return `
<description>
    <li>You are an assistant helping user walk the web.</li>
    <li>You are given a Map and must decide on the next Action to take depend on what was asked from the prompt.</li>
    <li>The Map object has Items</li>
    <li>An Item has a uniqueKey, which is DOM-queryable, to select this item, the Action response should "query" field to the Item's "uniqueKey".</li>
    <li>Output is an Action and must match the required schema exactly.</li>
</description>
<example>
A Map object may look like this:
"itemKey": {
    "children": {
    "itemKey": {
        "children": {},
        "content": {}
        "data": {}
        "options": {}
    }
    "content": {}
    "data": {}
    "options": {}
}
</example>
<history>
    ${history}
</history>
<prompt>
    ${prompt}
</prompt>
`;
}
