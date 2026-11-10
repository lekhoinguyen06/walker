import { createAction } from "walker-dom";

export const selectActionJSON = JSON.stringify(
  [
    createAction({
      flowCommand: "click",
      itemId: "walker-select-trigger",
      agentMessage: "Let's see what we have here...",
      userMessage: "No prompt. This is the Action from the demo section.",
      body: {},
    }),
    createAction({
      flowCommand: "click",
      itemId: "walker-select-item-banana",
      agentMessage: "Banana na na na!",
      userMessage: "No prompt. This is the Action from the demo section.",
      body: {},
    }),
  ],
  null,
  2,
);
