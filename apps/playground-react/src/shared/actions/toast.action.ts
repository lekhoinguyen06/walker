import { ade } from "@/walker/ade";
import { createAction } from "walker-dom";

export const toastActionJSON: string = JSON.stringify(
  [
    createAction({
      flowCommand: "click",
      itemId: ade.ptt().id,
      message: "Let's see what we have here...",
      body: {},
    }),
  ],
  null,
  2,
);
