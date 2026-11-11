import { ade } from "@/walker/ade";
import { createAction } from "walker-dom";

export const toastActionJSON: string = JSON.stringify(
  [
    createAction({
      flowCommand: "click",
      itemId: ade.ptt().id,
      agentMessage: "Let's see what we have here...",
      userMessage: "",
      systemMessage: "Demo example",
      body: {},
    }),
  ],
  null,
  2,
);
