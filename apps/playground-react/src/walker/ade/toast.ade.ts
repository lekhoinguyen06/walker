import type { ADEType } from "./type";

export const toast = {
  pt: () =>
    ({
      id: "walker-playground-react::toast",
      description: "Toast page for the ShadcnUI Toast component demonstration",
    }) as const,
  ptt: () =>
    ({
      id: "walker-playground-react::toast::trigger",
      description: "Click the button to trigger the toast",
      flows: ["click"],
    }) as const,
} as const satisfies ADEType;
