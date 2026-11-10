import { dialog } from "./dialog.ade";
import { home } from "./home.ade";
import { input } from "./input.ade";
import { nav } from "./nav.ade";
import { scrollArea } from "./scroll-area.ade.";
import type { ADEType } from "./type";

export const ade = {
  p: () => ({
    id: "walker-playground-react",
    description: "The is the Walker React playground.",
  }),
  ...nav,
  ...home,
  ...input,
  ...dialog,
  ...scrollArea,
} as const satisfies ADEType;
