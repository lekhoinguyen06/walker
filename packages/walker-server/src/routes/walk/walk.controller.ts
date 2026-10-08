import type { IRequestStrict } from "itty-router";
import {
  WalkRequestBodySchema,
  type WalkRequestBodyDTO,
  type WalkResponseBodyDTO,
} from "./walk.dto";
import { generateText, Output } from "ai";
import { ActionSchema } from "walker-core";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const or = createOpenRouter({
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});

const ai = or.chat("openai/gpt-oss-20b", {
  provider: {
    only: ["groq"],
  },
});

type WalkRequestType = {
  content: WalkRequestBodyDTO | undefined;
} & IRequestStrict;

export const walkController = async (req: WalkRequestType) => {
  const body = WalkRequestBodySchema.safeParse(req.content);

  if (!body.success) {
    return {
      status: 400,
      message: "Invalid request body",
      body: req.content,
    };
  }

  const result = await generateText({
    model: ai,
    output: Output.object({
      schema: ActionSchema,
    }),
    prompt: JSON.stringify(body.data),
    maxOutputTokens: 10000,
    reasoning: "low",
    toolChoice: "none",
    temperature: 0.2,
  });

  const action = ActionSchema.parse(result.output);

  return {
    action,
    metadata: {
      timestamp: new Date(),
      usage: result.usage,
    },
  } satisfies WalkResponseBodyDTO;
};
