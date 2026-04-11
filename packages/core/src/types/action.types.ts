import { z } from 'zod';

export const ActionSchema = z.object({
  id: z.uuid().default(() => crypto.randomUUID()),

  action: z.string().min(1),
  query: z.string().min(1),

  message: z.string().default(''),
  data: z.string().default(''),

  currentRoute: z.string().default(''),
  currentURL: z.string().url().default(''),
});

export const ActionInputSchema = ActionSchema.array();

export type Action = z.infer<typeof ActionSchema>;
export type ActionInput = z.infer<typeof ActionInputSchema>;
