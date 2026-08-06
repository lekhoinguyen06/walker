import z from "zod";

export const ItemSchema = z.object({
  id: z.string(),
  type: z.string().optional(),
  description: z.string(),
  content: z.string(),
});

export const ItemWithChildrenSchema = ItemSchema.extend({
  children: z.record(z.string(), ItemSchema),
});

export type ItemType = z.infer<typeof ItemSchema>;

export const MapSchema = z.object({
  hash: z.string(),
  map: z.record(z.string(), ItemWithChildrenSchema),
});

export type MapType = z.infer<typeof MapSchema>;
