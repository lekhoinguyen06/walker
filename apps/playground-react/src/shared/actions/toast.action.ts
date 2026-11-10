import { createAction } from "walker-dom";

export const toastActionJSON: string = JSON.stringify(
  [
    createAction({
      flowCommand: "click",
      itemId: "walker-toast-trigger",
      agentMessage: "Let's see what we have here...",
      userMessage: "No prompt. This is the Action from the demo section.",
      body: {},
    }),
  ],
  null,
  2,
);
