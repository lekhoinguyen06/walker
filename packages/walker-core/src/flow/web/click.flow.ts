import { createFlowBodySchema } from "walker-shared";
import { createFlow, type CreateFlowProps } from "../flow.helpers";
import { wait } from "../../shared/utils/wait";

export const clickFlow: CreateFlowProps<unknown> = createFlow({
  command: "click",
  description: "Click on an element",
  route: "*",
  schema: createFlowBodySchema({ flow: "click" }),
  handler: async (props) => {
    const walker = document.getElementById(props.action.targetId);
    const element = walker?.firstElementChild;

    if (element instanceof HTMLElement) {
      const gap = props.context.config.gap;
      await wait(gap);
      await props.context.hooks.onMessage?.(props);
      await wait(gap);
      await props.context.hooks.onScroll?.(props);
      await wait(gap);
      await props.context.hooks.onMouse?.(props);
      await wait(gap > 1000 ? gap : 1000);
      element.click();

      // Move mouse back to container
      if (!props.context.config.loop || props.action.end) {
        await props.context.hooks.onMouse?.({
          ...props,
          action: {
            ...props.action,
            targetId: "mouse-container",
          },
        });
        await wait(gap > 1000 ? gap : 1000);
      }
    }
  },
});
