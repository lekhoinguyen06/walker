import z from "zod";

export const ScopeSchema = z.literal(["active", "hidden", "inherit"]);

export const ItemSchema = z.object({
  id: z.string(),
  type: z.string(),
  description: z.string(),
  state: z.string().nullable(),
  scope: ScopeSchema,
  flows: z.array(z.string()),
  refId: z.string().nullable(),
  content: z.boolean(),
  raw: z.boolean(),
});

export const ItemListSchema = z.array(ItemSchema);

export const MapItemSchema = ItemSchema.extend({
  children: z.record(z.string(), ItemSchema).optional(),
  isInActiveScope: z.boolean().optional(),
  contentValue: z.string().optional(),
  rawValue: z.string().optional(),
});

export const MapSchema = z.record(z.string(), MapItemSchema);

export type ItemType = z.infer<typeof ItemSchema>;
export type MapItemType = z.infer<typeof MapItemSchema>;
export type MapType = z.infer<typeof MapSchema>;
export type ScopeType = z.infer<typeof ScopeSchema>;

export const ObservedAttributes = [
  "id",
  "type",
  "description",
  "flows",
  "scope",
  "state",
  "refId",
  "content",
  "raw",
] as const;

export type ObservedAttributesType = (typeof ObservedAttributes)[number];
