import z from "zod";

export const ItemSchema = z.object({
  id: z.string(),
  description: z.string().optional(),
  state: z.string().optional(),
  flows: z.array(z.string()).optional(),
});

export type ItemType = z.infer<typeof ItemSchema>;
