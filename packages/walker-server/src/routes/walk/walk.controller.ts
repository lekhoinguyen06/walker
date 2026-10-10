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
import z from "zod";
import { walkerSkill } from "walker-skill";

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
      throw new StatusError(400, {
        status: 400,
        message: "Invalid request body",
        error: body.error.message,
      } satisfies ErrorResponseDTO);
    }

    const flowAgent = await generateText({
      model: ai,
      output: Output.object({
        schema: z.object({
          selectedFlowCommand: z.string(),
        }),
      }),
      prompt: JSON.stringify({
        ...body.data,
        role: "Flow Picker",
      }),
      maxOutputTokens: 10000,
      reasoning: "low",
      toolChoice: "none",
      temperature: 0.2,
    });

    const flowSchema = body.data.flows.find(
      (f) => f.command == flowAgent.output.selectedFlowCommand,
    )?.schema as string | undefined;

    if (!flowSchema) {
      throw new StatusError(
        400,
        `No flow schema found for the given command: ${flowAgent.output}`,
      );
    }

    const walkAgent = await generateText({
      model: ai,
      output: Output.object({
        schema: z.fromJSONSchema(flowSchema),
      }),
      prompt: JSON.stringify({
        ...body.data,
        skill: [walkerSkill],
        role: "Action Generator",
      }),
      maxOutputTokens: 10000,
      reasoning: "low",
      toolChoice: "none",
      temperature: 0.2,
    });

    const action = ActionSchema.parse(walkAgent.output);

    return {
      action,
      metadata: {
        timestamp: new Date(),
        usage: {
          inputTokens:
            flowAgent.usage.inputTokens && walkAgent.usage.inputTokens
              ? flowAgent.usage.inputTokens + walkAgent.usage.inputTokens
              : undefined,
          outputTokens:
            flowAgent.usage.outputTokens && walkAgent.usage.outputTokens
              ? flowAgent.usage.outputTokens + walkAgent.usage.outputTokens
              : undefined,
        },
      },
    } satisfies WalkResponseBodyDTO;
  } catch (error) {
    throw new StatusError(500, {
      status: 500,
      message: "Internal server error",
      error: (error as Error).message,
    } satisfies ErrorResponseDTO);
  }
};
