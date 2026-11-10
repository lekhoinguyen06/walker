import { ade } from "@/walker/ade";
import { createAction } from "walker-dom";

export const selectActionJSON = JSON.stringify(
  [
    createAction({
      flowCommand: "click",
      itemId: ade.pss().id,
      agentMessage: "Banana na na",
      userMessage: "No prompt. This is the Action from the demo section.",
      body: {
        option: "banana",
      },
    }),
  ],
  null,
  2,
);
