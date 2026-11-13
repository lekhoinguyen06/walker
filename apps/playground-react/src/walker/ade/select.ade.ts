import type { ADEType } from "./type";

export const select = {
  ps: () =>
    ({
      id: "walker-playground-react::select",
      description:
        "Select page for the ShadcnUI Select component demonstration",
    }) as const,
  pss: () =>
    ({
      id: `walker-playground-react::select::select-field`,
      description: `To select, use the select-demo flow.`,
      flows: [`select-demo`],
    }) as const,
  psso: (option: string) =>
    ({
      id: `walker-playground-react::select::select-field::${option}`,
      description: `An option with value ${option}`,
    }) as const,
} as const satisfies ADEType;
