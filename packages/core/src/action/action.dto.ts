import z from "zod";

export const ActionSchema = z
  .object({
    command: z.string(),
    message: z.string(),
    target: z.string(),
    prompt: z.string().optional(),
    end: z.boolean().optional(),
  })
  .loose();

export type ActionType = z.infer<typeof ActionSchema>;
