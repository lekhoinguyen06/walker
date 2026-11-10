import { selectDemoFlowBodyJSONSchemaStringify } from "../flows/selectDemo.flow";
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
      description: `To select, provide the \'select\' flow's body with the schema: ${selectDemoFlowBodyJSONSchemaStringify}`,
      flows: [`select-demo`],
    }) as const,
} as const satisfies ADEType;
