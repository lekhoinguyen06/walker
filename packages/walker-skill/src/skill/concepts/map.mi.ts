import { CODE, PAGE, TEXT } from "../../banhmi";

PAGE("concept_map", {});

TEXT(
  `
# Map

A list of Items to show the map of the Walker Client
  `,
  {
    viewRefs: ["all"],
  },
);

CODE(
  `
export const MapSchema = z.array(ItemSchema);
  `,
  {
    language: "ts",
    viewRefs: ["all"],
  },
);
