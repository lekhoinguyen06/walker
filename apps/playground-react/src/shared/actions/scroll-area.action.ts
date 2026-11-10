import { ade } from "@/walker/ade";
import { createAction } from "walker-dom";

export const scrollAreaActionJSON = JSON.stringify(
  [
    createAction({
      flowCommand: "click",
      itemId: ade.psao("v1.2.0-beta.1").id,
      agentMessage: "I am gonna pick the earliest version.",
      userMessage: "No prompt. This is the Action from the demo section.",
      body: {},
    }),
    createAction({
      flowCommand: "click",
      itemId: ade.psao("v1.2.0-beta.50").id,
      agentMessage: "You know what, I am gonna pick the latest version.",
      userMessage: "No prompt. This is the Action from the demo section.",
      body: {},
    }),
  ],
  null,
  2,
);
