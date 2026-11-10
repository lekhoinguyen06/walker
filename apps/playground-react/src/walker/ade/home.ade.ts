import type { ADEType } from "./type";

export const home = {
  ph: {
    id: "walker-playground-react::home",
    description: "Home page",
  },
  phc: {
    id: "walker-playground-react::home::components",
    description: "Component demonstrations",
  },
  phci: {
    id: "walker-playground-react::home::components::input",
    description: "Go to Walker demonstration for ShadcnUI Input",
    flows: ["click"],
  },
  phcs: {
    id: "walker-playground-react::home::components::select",
    description: "Go to Walker demonstration for ShadcnUI Select",
    flows: ["click"],
  },
  phcd: {
    id: "walker-playground-react::home::components::dialog",
    description: "Go to Walker demonstration for ShadcnUI Dialog",
    flows: ["click"],
  },
  phcsa: {
    id: "walker-playground-react::home::components::scroll-area",
    description: "Go to Walker demonstration for ShadcnUI Scroll Area",
    flows: ["click"],
  },
  phct: {
    id: "walker-playground-react::home::components::toast",
    description: "Go to Walker demonstration for ShadcnUI Toast",
    flows: ["click"],
  },
} as const satisfies ADEType;
