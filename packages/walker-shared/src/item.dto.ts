import z from "zod";

export const ItemSchema = z.object({
  id: z.string(),
  state: z.string(),
});

export type ItemType = z.infer<typeof ItemSchema>;
