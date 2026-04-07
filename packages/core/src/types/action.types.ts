import { z } from 'zod';

export const ActionSchema = z.object({
  id: z.string(),

  action: z.string().min(1),
  query: z.string().min(1),

  message: z.string().default(''),
  data: z.string().default(''),

  currentRoute: z.string().default(''),
  currentURL: z.string().url().default(''),
});

export type Action = z.infer<typeof ActionSchema>;
