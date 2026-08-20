import { wait } from "../shared/utils/wait";
import type { FlowsType } from "./flow.dto";

/**
 * webFlows is a collection of flows that are specific to web applications provided by the core library.
 */
export const webFlows: FlowsType = new Map([
  [
    "click",
    {
      command: "click",
      description: "Click on an element",
      route: "*",
      handler: async (props) => {
        const walker = document.getElementById(props.action.target);
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
    },
  ],
  [
    "select",
    {
      command: "select",
      description: "Trigger select",
      route: "*",
      handler: async (props) => {
        const walker = document.getElementById(props.action.target);
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
        }
      },
    },
  ],
  [
    "input",
    {
      command: "input",
      description: "Input text into an element.",
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
    },
  ],
]);
