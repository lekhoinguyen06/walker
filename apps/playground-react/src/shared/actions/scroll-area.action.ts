import { createAction } from "walker-dom";

export const scrollAreaActionJSON = JSON.stringify(
  [
    createAction({
      flowCommand: "click",
      itemId: "v1.2.0-beta.1",
      agentMessage: "I am gonna pick the earliest version.",
      userMessage: "No prompt. This is the Action from the demo section.",
      body: {},
    }),
    createAction({
      flowCommand: "click",
      itemId: "v1.2.0-beta.50",
      agentMessage: "You know what, I am gonna pick the latest version.",
      userMessage: "No prompt. This is the Action from the demo section.",
      body: {},
    }),
  ],
  null,
  2,
);
