import z from "zod";

export const ItemSchema = z.object({
  id: z.string(),
  type: z.string(),
  description: z.string(),
  state: z.string().nullable().optional(),
  scope: z.enum(["active", "inactive", "hidden"]),
  content: z.boolean().nullable().optional(),
  raw: z.boolean().nullable().optional(),
});

export const MapItemSchema = ItemSchema.extend({
  children: z.record(z.string(), ItemSchema),
  contentValue: z.string().optional(),
  rawValue: z.string().optional(),
});

export type ItemType = z.infer<typeof ItemSchema>;
export const MapSchema = z.record(z.string(), MapItemSchema);
export type MapType = z.infer<typeof MapSchema>;
