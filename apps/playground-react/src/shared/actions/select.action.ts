import { createAction } from "walker-react/core";

export const selectActionJSON = JSON.stringify(
  [
    createAction({
      flow: "click",
      targetId: "select-trigger",
      message: "Let's see what we have here...",
      prompt: "No prompt. This is the Action from the demo section.",
      end: false,
    }),
    createAction({
      flow: "click",
      targetId: "select-item-banana",
      message: "Banana na na na!",
      prompt: "No prompt. This is the Action from the demo section.",
      end: true,
    }),
  ],
  null,
  2,
);
