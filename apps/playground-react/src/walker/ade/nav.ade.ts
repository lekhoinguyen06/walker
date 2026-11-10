import type { ADEType } from "./type";

export const nav = {
  ph: () =>
    ({
      id: "walker-playground-react::home",
      description: "Home page",
    }) as const,
  pn: () =>
    ({
      id: "walker-playground-react::nav",
      description: "Navigation bar",
    }) as const,
  pnh: () =>
    ({
      id: "walker-playground-react::nav::home",
      description: "Navigation button to go to home page",
      flows: ["click"],
    }) as const,
  pnr: () =>
    ({
      id: "walker-playground-react::nav::react",
      description:
        "Navigation button to go to Walker React Playround (which also goes back to home page)",
      flows: ["click"],
    }) as const,
  pnv: () =>
    ({
      id: "walker-playground-react::nav::vue",
      description:
        "Navigation button to go to Walker Vue Playround (not implemented yet)",
    }) as const,
  pns: () =>
    ({
      id: "walker-playground-react::nav::svelte",
      description:
        "Navigation button to go to Walker Vue Playround (not implemented yet)",
    }) as const,
  pnm: () =>
    ({
      id: "walker-playground-react::nav-mobile",
      description: "Navigation sidebar",
    }) as const,
  pnmt: () =>
    ({
      id: "walker-playground-react::nav-mobile::trigger",
      description:
        "Button to open the navigation sidebar. Note: This is only visible on mobile screens. There is no close button, click the walker-playground-react::nav-mobile::react to navigate back.",
      flows: ["click"],
    }) as const,
  pnmh: () =>
    ({
      id: "walker-playground-react::nav-mobile::home",
      description: "Navigation button to go to home page",
      flows: ["click"],
    }) as const,
  pnmr: () =>
    ({
      id: "walker-playground-react::nav-mobile::react",
      description:
        "Navigation button to go to Walker React Playround (which also goes back to home page)",
      flows: ["click"],
    }) as const,
  pnmv: () =>
    ({
      id: "walker-playground-react::nav-mobile::vue",
      description:
        "Navigation button to go to Walker Vue Playround (not implemented yet)",
    }) as const,
  pnms: () =>
    ({
      id: "walker-playground-react::nav-mobile::svelte",
      description:
        "Navigation button to go to Walker Vue Playround (not implemented yet)",
    }) as const,
} as const satisfies ADEType;
