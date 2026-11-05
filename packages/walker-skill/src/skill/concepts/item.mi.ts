import { CODE, PAGE, TEXT } from "../../banhmi";

PAGE("concept_item", {
  viewRefs: ["all"],
});

TEXT(`
# Item

An object that represent an interactable entity on Walker Client.
  `);

CODE(
  `
export const ScopeSchema = z.literal(["active", "hidden", "inherit"]);

export const ItemSchema = z.object({
  id: z.string(),
  type: z.string(),
  description: z.string(),
  state: z.string().nullable(),
  scope: ScopeSchema,
  flows: z.string(),
  refId: z.string().nullable(),
  content: z.boolean(),
  raw: z.boolean(),
});

export const MapItemSchema: z.ZodType<MapItemType> = ItemSchema.extend({
  children: z
    .record(
      z.string(),
      z.lazy(() => MapItemSchema),
    )
    .optional(),
  isInActiveScope: z.boolean().optional(),
  contentValue: z.string().optional(),
  rawValue: z.string().optional(),
});
  `,
  {
    language: "ts",
  },
);
