import z from "zod";

export interface ActionType<T = any> {
  flow: string;
  message: string;
  targetId: string;
  prompt: string;
  end: boolean;
  body?: T;
}

export type ActionSchemaType = z.ZodObject<
  {
    flow: z.ZodString;
    message: z.ZodString;
    targetId: z.ZodString;
    prompt: z.ZodString;
    end: z.ZodBoolean;
  },
  z.core.$loose
>;

export const ActionSchema: ActionSchemaType = z
  .object({
    flow: z.string(),
    message: z.string(),
    targetId: z.string(),
    prompt: z.string(),
    end: z.boolean(),
  })
  .loose();
