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

export type ActionType = z.infer<typeof ActionSchema>;
