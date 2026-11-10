export const ade = {
  p: {
    id: "walker-playground-react",
    description: "The is the Walker React playground.",
  },
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
  pc: {
    id: "walker-playground-react::components",
    description: "Component demonstrations",
  },
  pci: {
    id: "walker-playground-react::components::input",
    description: "Go to Walker demonstration for ShadcnUI Input",
    flows: ["click"],
  },
  pcs: {
    id: "walker-playground-react::components::select",
    description: "Go to Walker demonstration for ShadcnUI Select",
    flows: ["click"],
  },
  pcd: {
    id: "walker-playground-react::components::dialog",
    description: "Go to Walker demonstration for ShadcnUI Dialog",
    flows: ["click"],
  },
  pcsa: {
    id: "walker-playground-react::components::scroll-area",
    description: "Go to Walker demonstration for ShadcnUI Scroll Area",
    flows: ["click"],
  },
  pct: {
    id: "walker-playground-react::components::toast",
    description: "Go to Walker demonstration for ShadcnUI Toast",
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
} as const satisfies Record<
  string,
  {
    id: string;
    description: string;
    flows?: readonly string[];
  }
>;
