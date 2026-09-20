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

type ItemSchemaType = z.ZodObject<
  {
    id: z.ZodString;
    type: z.ZodString;
    description: z.ZodString;
    state: z.ZodNullable<z.ZodString>;
    scope: z.ZodBoolean;
    content: z.ZodBoolean;
    raw: z.ZodBoolean;
  },
  z.core.$strip
>;

export const ItemSchema: ItemSchemaType = z.object({
  id: z.string(),
  type: z.string(),
  description: z.string(),
  state: z.string().nullable(),
  scope: z.boolean(),
  content: z.boolean(),
  raw: z.boolean(),
});

export interface ItemWithChildrenType extends ItemType {
  children?: Record<string, ItemType>;
  contentValue?: string;
  rawValue?: string;
}

type ItemWithChildrenSchemaType = z.ZodObject<
  {
    id: z.ZodString;
    type: z.ZodString;
    description: z.ZodString;
    state: z.ZodNullable<z.ZodString>;
    scope: z.ZodBoolean;
    isInActiveScope: z.ZodOptional<z.ZodBoolean>;
    content: z.ZodBoolean;
    raw: z.ZodBoolean;
    children: z.ZodOptional<z.ZodRecord<z.ZodString, ItemSchemaType>>;
    contentValue: z.ZodOptional<z.ZodString>;
    rawValue: z.ZodOptional<z.ZodString>;
  },
  z.core.$strip
>;

export const ItemWithChildrenSchema: ItemWithChildrenSchemaType =
  ItemSchema.extend({
    children: z.record(z.string(), ItemSchema).optional(),
    isInActiveScope: z.boolean().optional(),
    contentValue: z.string().optional(),
    rawValue: z.string().optional(),
  });

export interface MapType extends Record<string, ItemWithChildrenType> {}

type MapSchemaType = z.ZodRecord<z.ZodString, ItemWithChildrenSchemaType>;
export const MapSchema: MapSchemaType = z.record(
  z.string(),
  ItemWithChildrenSchema,
);
