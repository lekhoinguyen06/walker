import z from "zod";

export const ItemSchema = z.object({
  id: z.string(),
  type: z.string(),
  description: z.string(),
  state: z.string().nullable(),
  scope: z.boolean(),
  isInActiveScope: z.boolean(),
  content: z.boolean(),
  raw: z.boolean(),
});

export const MapItemSchema = ItemSchema.extend({
  children: z.record(z.string(), ItemSchema).optional(),
  contentValue: z.string().optional(),
  rawValue: z.string().optional(),
});

export const MapSchema = z.record(z.string(), MapItemSchema);

export type ItemType = z.infer<typeof ItemSchema>;
export type MapItemType = z.infer<typeof MapItemSchema>;
export type MapType = z.infer<typeof MapSchema>;
