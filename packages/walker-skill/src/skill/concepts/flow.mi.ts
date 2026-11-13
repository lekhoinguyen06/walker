import { CODE, PAGE, TEXT } from "../../banhmi";

PAGE("concept_flow", {});

TEXT(
  `
# Flow

Flows are what type of Action the Walker Client accepts and executes.
`,
  {
    viewRefs: ["all"],
  },
);

CODE(
  `
export const FlowSchema = z
  .object({
    command: z.string(),
    description: z.string().optional(),
    schema: z.string().optional(),
  })
  .loose();
  `,
  {
    language: "ts",
    viewRefs: ["all"],
  },
);

TEXT(
  `
.command: the type of flow that Walker Client accept
.description: a description of what the flow does
.schema:
- The JSON Schema of the Action object's body (eg. action.body attribute) that Walker Client accept for this flow.
- Note: the action.body attribute is not validated on the Walker Server. If it fails validation on the Walker CLient, the error message will be included in the history logs (eg. history.logs attribute).
`,
  {
    viewRefs: ["all"],
  },
);
