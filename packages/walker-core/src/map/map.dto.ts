import z from "zod";

export interface ItemType {
  id: string;
  type: string;
  description: string;
  state: string | null;
  scope: boolean;
  isInActiveScope: boolean;
  content: boolean;
  raw: boolean;
}

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

export interface ItemWithChildrenType extends ItemType {
  children?: Record<string, ItemType>;
  contentValue?: string;
  rawValue?: string;
}

export const ItemWithChildrenSchema = ItemSchema.extend({
  children: z.record(z.string(), ItemSchema).optional(),
  contentValue: z.string().optional(),
  rawValue: z.string().optional(),
});

export interface MapType extends Record<string, ItemWithChildrenType> {}
export const MapSchema = z.record(z.string(), ItemWithChildrenSchema);
