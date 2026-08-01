import { wait } from "../shared/utils/wait";
import type { FlowType } from "./type";

export const webFlows: FlowType[] = [
  {
    command: "click",
    description: "Click on an element",
    route: "*",
    handler: async ({ message, target }) => {
      const element = document.querySelector(target);

      if (element instanceof HTMLElement) {
        alert(message);
        await wait(1000);
        element.click();
        await wait(1000);
      }
    },
  },
  {
    command: "navigate",
    description:
      "Navigate to a URL. This is hard navigation, use the click command on a button if possible for soft navigation.",
    route: "*",
    handler: async ({ message, target }) => {
      const element = document.querySelector(target);

      if (element instanceof HTMLElement) {
        alert(message);
        await wait(1000);
        element.click();
        await wait(1000);
      }
    },
  },
  {
    command: "input",
    description: "Input text into an element.",
    route: "*",
    handler: async ({ message, target, body }) => {
      const element = document.querySelector(target);

      if (element instanceof HTMLInputElement) {
        alert(message);
        await wait(1000);
        if (body) element.value = body;
        await wait(1000);
      }
    },
  },
];
