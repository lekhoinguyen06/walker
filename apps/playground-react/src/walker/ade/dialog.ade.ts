import type { ADEType } from "./type";

export const dialog = {
  pd: {
    id: "walker-playground-react::dialog",
    description: "Dialog page for the ShadcnUI Input component demonstration",
  },
  pdt: {
    id: "walker-playground-react::dialog::trigger",
    description: "Click the button to open the dialog",
    flows: ["click"],
  },
  pds: {
    id: "walker-playground-react::dialog::save",
    description: "Click the button to save the dialog",
    flows: ["click"],
  },
  pdc: {
    id: "walker-playground-react::dialog::close",
    description: "Click the button to close the dialog",
    flows: ["click"],
  },
  pdin: {
    id: "walker-playground-react::dialog::input-name",
    description: "Input field for name",
    flows: ["input"],
  },
  pdiu: {
    id: "walker-playground-react::dialog::input-username",
    description: "Input field for username",
    flows: ["input"],
  },
} as const satisfies ADEType;
