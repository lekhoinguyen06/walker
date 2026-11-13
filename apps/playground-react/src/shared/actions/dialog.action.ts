import { ade } from "@/walker/ade";
import { createAction } from "walker-dom";

export const dialogDemoFlowJSON = JSON.stringify(
  [
    createAction({
      flowCommand: "dialog-demo",
      itemId: ade.pdt().id,
      message: "Let's see what we have here...",
      body: {
        username: "walker",
        name: "Walker Jr.",
        save: true,
      },
    }),
  ],
  null,
  2,
);

export const dialogActionStepJSON = JSON.stringify(
  [
    createAction({
      flowCommand: "click",
      itemId: ade.pdt().id,
      message: "Let's see what we have here...",
      body: {},
    }),
    createAction({
      flowCommand: "input",
      itemId: ade.pdin().id,
      message: "Let's type in 'Walker Jr.'",
      body: {
        input: "Walker Jr.",
      },
    }),
    createAction({
      flowCommand: "input",
      itemId: ade.pdiu().id,
      message: "Let's type in '@walker'",
      body: {
        input: "@walker",
      },
    }),
    createAction({
      flowCommand: "click",
      itemId: ade.pds().id,
      message: "Nice! Let's save it!",
      body: {},
    }),
  ],
  null,
  2,
);
