import type { ADEType } from "./type";

export const scrollArea = {
  psa: () =>
    ({
      id: "walker-playground-react::scroll-area",
      description:
        "Scroll Area page for the ShadcnUI Scroll Area component demonstration",
    }) as const,
  psao: (option: string) =>
    ({
      id: `walker-playground-react::scroll-area::option::${option}`,
      description: `Click to select the ${option}`,
      flows: ["click"],
    }) as const,
} as const satisfies ADEType;
