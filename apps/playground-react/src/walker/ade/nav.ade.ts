import type { ADEType } from "./type";

export const nav = {
  ph: {
    id: "walker-playground-react::home",
    description: "Home page",
  },
  pn: {
    id: "walker-playground-react::nav",
    description: "Navigation bar",
  },
  pnh: {
    id: "walker-playground-react::nav::home",
    description: "Navigation button to go to home page",
    flows: ["click"],
  },
  pnr: {
    id: "walker-playground-react::nav::react",
    description:
      "Navigation button to go to Walker React Playround (which also goes back to home page)",
    flows: ["click"],
  },
  pnv: {
    id: "walker-playground-react::nav::vue",
    description:
      "Navigation button to go to Walker Vue Playround (not implemented yet)",
  },
  pns: {
    id: "walker-playground-react::nav::svelte",
    description:
      "Navigation button to go to Walker Vue Playround (not implemented yet)",
  },
  pnm: {
    id: "walker-playground-react::nav-mobile",
    description: "Navigation sidebar",
  },
  pnmt: {
    id: "walker-playground-react::nav-mobile::trigger",
    description:
      "Button to open the navigation sidebar. Note: This is only visible on mobile screens. There is no close button, click the walker-playground-react::nav-mobile::react to navigate back.",
    flows: ["click"],
  },
  pnmh: {
    id: "walker-playground-react::nav-mobile::home",
    description: "Navigation button to go to home page",
    flows: ["click"],
  },
  pnmr: {
    id: "walker-playground-react::nav-mobile::react",
    description:
      "Navigation button to go to Walker React Playround (which also goes back to home page)",
    flows: ["click"],
  },
  pnmv: {
    id: "walker-playground-react::nav-mobile::vue",
    description:
      "Navigation button to go to Walker Vue Playround (not implemented yet)",
  },
  pnms: {
    id: "walker-playground-react::nav-mobile::svelte",
    description:
      "Navigation button to go to Walker Vue Playround (not implemented yet)",
  },
} as const satisfies ADEType;
