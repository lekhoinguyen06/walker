import type { ADEType } from "./type";

export const home = {
  ph: () =>
    ({
      id: "walker-playground-react::home",
      description: "Home page",
    }) as const,
  phc: (component: string) =>
    ({
      id: `walker-playground-react::home::components::${component}`,
      description: `Go to Walker demonstration for ShadcnUI ${component} component`,
      flows: ["click"],
    }) as const,
} as const satisfies ADEType;
