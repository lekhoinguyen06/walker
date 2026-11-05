import { StatusError, type IRequestStrict } from "itty-router";
import {
  WalkRequestBodySchema,
  type WalkRequestBodyDTO,
  type WalkResponseBodyDTO,
} from "./walk.dto";
import { generateText, Output, type LanguageModel } from "ai";
import { ActionSchema } from "walker-core";
import type { ErrorResponseDTO } from "../../shared/dto/res.dto";
import z from "zod";
import {
  walker_skill_about$407,
  walker_skill_agent_flow$335,
  walker_skill_agent_walk$239,
  walker_skill_concept_client$181,
  walker_skill_concept_server$196,
  walker_skill_concept_action$519,
  walker_skill_concept_history$429,
  walker_skill_concept_item$849,
  walker_skill_concept_map$328,
} from "walker-skill";

const walkerSkill = [
  walker_skill_about$407,
  walker_skill_agent_flow$335,
  walker_skill_agent_walk$239,
  walker_skill_concept_client$181,
  walker_skill_concept_server$196,
  walker_skill_concept_action$519,
  walker_skill_concept_history$429,
  walker_skill_concept_item$849,
  walker_skill_concept_map$328,
];

type WalkRequestType = {
  content: WalkRequestBodyDTO | undefined;
  ai: LanguageModel;
} & IRequestStrict;

export const walkController = async (req: WalkRequestType) => {
  try {
    const body = WalkRequestBodySchema.safeParse(req.content);
    const ai = req.ai;

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
        skill: [walkerSkill],
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
        // requestBody: body.data,
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
