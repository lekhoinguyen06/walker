import { CODE, PAGE, TEXT } from "../../banhmi";

PAGE("concept_flow", {
  viewRefs: ["all"],
});

TEXT(`
# Flow

Flows are what type of Action the client accepts and executes.
`);

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
  },
);
