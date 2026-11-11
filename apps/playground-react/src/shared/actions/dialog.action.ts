import { ade } from "@/walker/ade";
import { createAction } from "walker-dom";

export const dialogDemoFlowJSON = JSON.stringify(
  [
    createAction({
      flowCommand: "dialog-demo",
      itemId: ade.pd().id,
      agentMessage: "Let's see what we have here...",
      userMessage: "",
      systemMessage: "Demo example.",
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
      agentMessage: "Let's see what we have here...",
      userMessage: "",
      systemMessage: "Demo example.",
      body: {},
    }),
    createAction({
      flowCommand: "input",
      itemId: ade.pdin().id,
      agentMessage: "Let's type in 'Walker Jr.'",
      userMessage: "",
      systemMessage: "Demo example.",
      body: {
        input: "Walker Jr.",
      },
    }),
    createAction({
      flowCommand: "input",
      itemId: ade.pdiu().id,
      agentMessage: "Let's type in '@walker'",
      userMessage: "",
      systemMessage: "Demo example.",
      body: {
        input: "@walker",
      },
    }),
    createAction({
      flowCommand: "click",
      itemId: ade.pds().id,
      agentMessage: "Nice! Let's save it!",
      userMessage: "",
      systemMessage: "Demo example.",
      body: {},
    }),
  ],
  null,
  2,
);
