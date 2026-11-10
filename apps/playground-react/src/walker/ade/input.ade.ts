import type { ADEType } from "./type";

export const input = {
  pi: {
    id: "walker-playground-react::input",
    description: "Input page for the ShadcnUI Input component demonstration",
  },
  pii: {
    id: "walker-playground-react::input::input-field",
    description: "Input field",
    flows: ["input"],
  },
} as const satisfies ADEType;
