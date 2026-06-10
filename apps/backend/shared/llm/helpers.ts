import log from "encore.dev/log";
import { z } from "zod";
import { buildParsePrompt } from "./prompt";

export async function invokeWithStructure<T>(llm: any, prompt: string, schema: z.ZodType<T>, maxRetries: number = 3): Promise<T> {
    const parseErrors: string[] = [];

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            log.debug("Parsing prompt: ", buildParsePrompt(prompt, schema, parseErrors));
            const response = await llm.invoke(buildParsePrompt(prompt, schema, parseErrors));

            const text = String(response.content)
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

            return schema.parse(JSON.parse(text));

        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            parseErrors.push(message);
            log.warn(`invokeWithStructure attempt ${attempt}/${maxRetries} failed:`, { message });

            if (attempt === maxRetries) {
                throw new Error(`Failed after ${maxRetries} attempts. Last error: ${message}`);
            }
        }
    }

    throw new Error("Unreachable");
}