import z from "zod";

export interface ActionType<T = any> {
  flow: string;
  message: string;
  targetId: string;
  prompt: string;
  end: boolean;
  body: T;
}

export const ActionSchema = z
  .object({
    flow: z.string(),
    message: z.string(),
    targetId: z.string(),
    prompt: z.string(),
    end: z.boolean(),
  })
  .loose();
