import { createFlowBodySchema } from "walker-shared";
import { createFlow, type CreateFlowProps } from "../flow.helpers";
import { wait } from "../../shared/utils/wait";

export const noneFlow: CreateFlowProps<unknown> = createFlow({
  command: "none",
  description:
    "Use this when no action need to be taken and send a message to the user.",
  route: "*",
  schema: createFlowBodySchema({
    flow: "none",
  }),
  handler: async (props) => {
    const gap = props.context.config.gap;
    await wait(gap);
    await props.context.hooks.onMessage?.(props);
    await wait(gap);
    await props.context.hooks.onMouseReturn?.(props);
  },
});
