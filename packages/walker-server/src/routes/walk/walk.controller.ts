import { StatusError, type IRequestStrict } from "itty-router";
import {
  WalkRequestBodySchema,
  type WalkRequestBodyDTO,
  type WalkResponseBodyDTO,
} from "./walk.dto";
import { generateText, Output } from "ai";
import { ActionSchema } from "walker-core";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { ErrorResponseDTO } from "../../shared/dto/res.dto";

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
  try {
    const body = WalkRequestBodySchema.safeParse(req.content);

    if (!body.success) {
      throw new StatusError(400, JSON.stringify(body.error.message));
      // throw new StatusError(400, {
      //   status: 400,
      //   message: "Invalid request body",
      //   error: body.error.message,
      // });
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
  } catch (error) {
    return {
      status: 500,
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Internal server error",
    } satisfies ErrorResponseDTO;
  }
};
