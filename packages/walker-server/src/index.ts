import { AutoRouter, withContent, type IRequestStrict } from "itty-router";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText, Output } from "ai";
import { ActionSchema } from "walker-core";
import { WalkRequestBodySchema, type WalkRequestBodyType } from "./walk.dto";

const or = createOpenRouter({
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});

export const ai = or.chat("openai/gpt-oss-20b", {
  provider: {
    sort: "throughput",
  },
});

const router = AutoRouter();

router.get("/api/walker/", () => {
  return "Hello Walkers!";
});

router.get("/api/walker/health", () => {
  return {
    status: 200,
    message: `Hello, Walkers!`,
  };
});

type WalkRequestType = {
  content: WalkRequestBodyType | undefined;
} & IRequestStrict;

router.post("/api/walker/walk", withContent, async (req: WalkRequestType) => {
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
    reasoning: "minimal",
    toolChoice: "none",
    temperature: 0.2,
  });

  return result;
});

export type WalkerServerType = {
  handler: typeof router.fetch;
};

export const walker: WalkerServerType = {
  handler: router.fetch,
};
