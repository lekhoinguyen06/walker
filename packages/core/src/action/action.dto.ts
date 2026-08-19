import z from "zod";

export const ActionSchema = z.object({
  walkId: z.string(),
  command: z.string(),
  message: z.string(),
  target: z.string(),
  body: z.string().optional(),
});

export type ActionType = z.infer<typeof ActionSchema>;
