import { createAction } from "walker-react/core";

export const toastActionJSON: string = JSON.stringify(
  [
    createAction({
      flow: "click",
      targetId: "toast-trigger",
      message: "Let's see what we have here...",
      end: true,
      prompt: "No prompt. This is the Action from the demo section.",
    }),
  ],
  null,
  2,
);
