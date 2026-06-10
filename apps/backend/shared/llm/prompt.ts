export function buildParsePrompt(prompt: string, schema: object, parseErrors: string[] = []): string {
    return `
${prompt}
<response_format>
    <rule>Respond with ONLY valid JSON matching this schema, no markdown, no backticks. You are provided a Zod schema below:</rule>
    <schema>
        ${JSON.stringify(schema, null, 2)}
    </schema>
    ${parseErrors.length > 0 ? `
    <error_hint>
        Previous attempts failed with these errors, fix them:
        ${parseErrors.slice(-3).map((e, i) => `Error ${i + 1}: ${e}`).join("\n")}
    </error_hint>
    ` : ""}
</response_format>
`
}