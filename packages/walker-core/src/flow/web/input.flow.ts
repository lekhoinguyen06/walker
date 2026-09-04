import z from "zod";
import { ActionSchema } from "../../action/action.dto";
import { createFlow } from "../flow.dto";
import { wait } from "../../shared/utils/wait";

export const inputFlow = createFlow({
  command: "input",
  description: "Input text into an element.",
  schema: ActionSchema.extend({
    command: z.literal("input"),
    body: z.string().optional(),
  }),
  route: "*",
  handler: async (props) => {
    const walker = document.getElementById(props.action.target);
    const element = walker?.firstElementChild;

    if (element instanceof HTMLInputElement) {
      const gap = props.context.config.gap;
      await wait(gap);
      await props.context.hooks.onMessage?.(props);
      await wait(gap);
      await props.context.hooks.onScroll?.(props);
      await wait(gap);
      await props.context.hooks.onMouse?.(props);
      await wait(gap > 1000 ? gap : 1000);
      if (props.action.body) {
        // React specific, we may need to provided React flow later when we support more frameworks
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value",
        )?.set;
        nativeInputValueSetter?.call(element, props.action.body);
        element.dispatchEvent(new Event("input", { bubbles: true }));
      }

      // Move mouse back to container
      await props.context.hooks.onMouse?.({
        ...props,
        action: {
          ...props.action,
          target: "mouse-container",
        },
      });
      await wait(gap > 1000 ? gap : 1000);
    }
  },
});
