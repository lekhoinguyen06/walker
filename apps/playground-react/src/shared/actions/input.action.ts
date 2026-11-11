import { ade } from "@/walker/ade";
import { createAction } from "walker-dom";

export const inputActionJSON: string = JSON.stringify(
  [
    createAction({
      flowCommand: "input",
      itemId: ade.pii().id,
      agentMessage: "Let's type in 'Hello World!'",
      userMessage: "",
      systemMessage: "Demo example",
      body: {
        input: "Hello World!",
      },
    }),
  ],
  null,
  2,
);
