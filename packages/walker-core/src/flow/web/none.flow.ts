import {
  createFlow,
  createFlowBodySchema,
  type CreateFlowProps,
} from "../flow.helpers";

export const noneFlow: CreateFlowProps<unknown> = createFlow({
  command: "none",
  description:
    "Use this when no action need to be taken and send a message to the user.",
  route: "*",
  schema: createFlowBodySchema({
    flow: "none",
  }),
  handler: async () => {},
});
