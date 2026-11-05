import { CODE, PAGE, TEXT } from "../../banhmi";

PAGE("concept_flow", {});

TEXT(
  `
# Flow

Flows are what type of Action the client accepts and executes.
`,
  {
    viewRefs: ["all"],
  },
);

CODE(
  `
export const FlowItemSchema = z.object({
  command: z.string(),
  description: z.string(),
  schema: z.unknown(),
});

export type FlowItemType = z.infer<typeof FlowItemSchema>;
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
.schema: the JSON Schema of the Action object that Walker Client accept for this flow. If you are the Walk Agent, you must generate an Action object that match the schema of the flow that the Flow Agent picked for you.
`,
  {
    viewRefs: ["all"],
  },
);
