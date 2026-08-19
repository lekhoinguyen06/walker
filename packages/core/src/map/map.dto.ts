import z from "zod";

export const ItemSchema = z.object({
  id: z.string(),
  type: z.string(),
  description: z.string(),
  state: z.record(z.string(), z.string()).nullable().optional(),
  scope: z.enum(["active", "inactive", "disabled"]),
  content: z.string().nullable().optional(),
  raw: z.string().nullable().optional(),
});

export const ItemWithChildrenSchema = ItemSchema.extend({
  children: z.record(z.string(), ItemSchema),
});

export type ItemType = z.infer<typeof ItemSchema>;
export const MapSchema = z.record(z.string(), ItemWithChildrenSchema);
export type MapType = z.infer<typeof MapSchema>;
