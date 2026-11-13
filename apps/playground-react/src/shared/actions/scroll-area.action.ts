import { ade } from "@/walker/ade";
import { createAction } from "walker-dom";

export const scrollAreaActionJSON = JSON.stringify(
  [
    createAction({
      flowCommand: "click",
      itemId: ade.psao("v1.2.0-beta.1").id,
      message: "I am gonna pick the earliest version.",
      body: {},
    }),
    createAction({
      flowCommand: "click",
      itemId: ade.psao("v1.2.0-beta.50").id,
      message: "You know what, I am gonna pick the latest version.",
      body: {},
    }),
  ],
  null,
  2,
);
