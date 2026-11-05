import { CODE, PAGE, TEXT } from "../../banhmi";

PAGE("concept_map", {
  viewRefs: ["all"],
});

TEXT(`
# Map

A record consist of Items to show the map of the Walker Client
  `);

CODE(
  `
export const MapSchema = z.record(z.string(), MapItemSchema);
export type MapType = z.infer<typeof MapSchema>;
  `,
  {
    language: "ts",
  },
);
