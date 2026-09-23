import { createAction } from "walker-react/core";

export const scrollAreaActionJSON = JSON.stringify(
  [
    createAction({
      flow: "click",
      targetId: "v1.2.0-beta.1",
      message: "I am gonna pick the earliest version.",
      prompt: "No prompt. This is the Action from the demo section.",
      end: false,
    }),
    createAction({
      flow: "click",
      targetId: "v1.2.0-beta.50",
      message: "You know what, I am gonna pick the latest version.",
      prompt: "No prompt. This is the Action from the demo section.",
      end: true,
    }),
  ],
  null,
  2,
);
