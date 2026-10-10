import z from "zod";

export const ActionSchema = z
  .object({
    flow: z.string(),
    message: z.string(),
    targetId: z.string(),
    prompt: z.string(),
    end: z.boolean(),
  })
  .loose();

export const ActionListSchema = z.array(ActionSchema);

export type ActionType<T = any> = z.infer<typeof ActionSchema> & {
  body?: T;
};
