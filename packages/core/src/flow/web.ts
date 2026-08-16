import { wait } from "../shared/utils/wait";
import type { FlowsType } from "./type";

/**
 * webFlows is a collection of flows that are specific to web applications provided by the core library.
 * @type {FlowsType}
 */
export const webFlows: FlowsType = new Map([
  [
    "click",
    {
      command: "click",
      description: "Click on an element",
      route: "*",
      handler: async (props) => {
        const element = document.querySelector(
          `walker-element#${props.action.target} > *`,
        );

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
    "select",
    {
      command: "select",
      description: "Trigger select",
      route: "*",
      handler: async (props) => {
        const element = document.querySelector(
          `walker-element#${props.action.target} > *`,
        );

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
        const element = document.querySelector(
          `walker-element#${props.action.target} > *`,
        );

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
            element.value = props.action.body;
          }
        }
      },
    },
  ],
]);
