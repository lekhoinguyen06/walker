import { ade } from "@/walker/ade";
import { createAction } from "walker-dom";

export const selectActionJSON = JSON.stringify(
  [
    createAction({
      flowCommand: "select-demo",
      itemId: ade.pss().id,
      message: "Banana na na",
      body: {
        option: "banana",
      },
    }),
  ],
  null,
  2,
);
