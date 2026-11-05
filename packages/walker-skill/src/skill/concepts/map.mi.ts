import { CODE, PAGE, TEXT } from "../../banhmi";

PAGE("concept_map", {});

TEXT(
  `
# Map

A record consist of Items to show the map of the Walker Client
  `,
  {
    viewRefs: ["all"],
  },
);

CODE(
  `
export const MapSchema = z.record(z.string(), MapItemSchema);
export type MapType = z.infer<typeof MapSchema>;
  `,
  {
    language: "ts",
    viewRefs: ["all"],
  },
);
