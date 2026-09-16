// TODO
import z from "zod";
import { ActionSchema } from "../../action/action.dto";
import { createFlow } from "../flow.dto";
import { createFlowBodySchema } from "../flow.helpers";

export const noneFlow = createFlow({
  command: "none",
  description:
    "Use this when no action need to be taken and send a message to the user.",
  route: "*",
  schema: createFlowBodySchema({
    flow: "none",
  }),
  handler: async (props) => {},
});
