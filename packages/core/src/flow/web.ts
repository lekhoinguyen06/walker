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
          `walker-element #${props.action.target} > *`,
        );

        if (element instanceof HTMLElement) {
          props.context.middlewares?.get("message")?.handler(props);
          props.context.middlewares?.get("scroll")?.handler(props);
          props.context.middlewares?.get("mouse")?.handler(props);
          await wait(1000);
          element.click();
        }
      },
    },
  ],
  // {
  //   command: "navigate",
  //   description:
  //     "Navigate to a URL. This is hard navigation, use the click command on a button if possible for soft navigation.",
  //   route: "*",
  //   handler: async ({ message, target }) => {
  //     const element = document.querySelector(`walker-element #${target} > *`);

  //     if (element instanceof HTMLElement) {
  //       alert(message);
  //       await wait(1000);
  //       element.click();
  //       await wait(1000);
  //     }
  //   },
  // },
  [
    "input",
    {
      command: "input",
      description: "Input text into an element.",
      route: "*",
      handler: async (props) => {
        const element = document.querySelector(
          `walker-element #${props.action.target} > *`,
        );

        if (element instanceof HTMLInputElement) {
          props.context.middlewares?.get("message")?.handler(props);
          props.context.middlewares?.get("scroll")?.handler(props);
          props.context.middlewares?.get("mouse")?.handler(props);
          await wait(1000);
          if (props.action.body) {
            element.value = props.action.body;
          }
        }
      },
    },
  ],
]);
