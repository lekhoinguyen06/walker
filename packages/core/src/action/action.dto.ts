import z from "zod";

export const ActionSchema = z
  .object({
    walkId: z.string(),
    command: z.string(),
    message: z.string(),
    target: z.string(),
  })
  .loose();

export type ActionType = z.infer<typeof ActionSchema>;
