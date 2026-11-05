import z from "zod";

export const ActionSchema = z
  .object({
    flow: z.string(),
    message: z.string(),
    targetId: z.string(),
    next: z.string(),
  })
  .loose();

export const ActionListSchema = z.array(ActionSchema);

export type ActionType<T = any> = z.infer<typeof ActionSchema> & {
  body?: T;
};
