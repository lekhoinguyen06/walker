import { StatusError, type IRequestStrict } from "itty-router";
import {
  WalkRequestBodySchema,
  type WalkRequestBodyDTO,
  type WalkResponseBodyDTO,
} from "./walk.dto";
import { generateText, Output, type LanguageModel } from "ai";
import { ActionSchema } from "walker-shared";
import type { ErrorResponseDTO } from "../../shared/dto/res.dto";
import { walker_skill_all$4535 } from "walker-skill";

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
        message: JSON.parse(body.error.message),
        error: body.error.message,
      } satisfies ErrorResponseDTO);
    }

    const walker = await generateText({
      model: ai,
      output: Output.object({
        schema: ActionSchema,
      }),
      prompt: JSON.stringify({
        ...body.data,
        skills: [walker_skill_all$4535, ...body.data.skills],
      } as WalkRequestBodyDTO),
      maxOutputTokens: 10000,
      reasoning: "low",
      toolChoice: "none",
      temperature: 0.2,
    });

    return {
      action: walker.output,
      metadata: {
        timestamp: new Date(),
        usage: walker.usage,
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
