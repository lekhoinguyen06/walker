import z from "zod";

export const ActionSchema = z.object({
  command: z.string(),
  message: z.string(),
  target: z.string(),
});

export type ActionType = z.infer<typeof ActionSchema>;
