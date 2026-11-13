import { ade } from "@/walker/ade";
import { createAction } from "walker-dom";

export const inputActionJSON: string = JSON.stringify(
  [
    createAction({
      flowCommand: "input",
      itemId: ade.pii().id,
      message: "Let's type in 'Hello World!'",
      body: {
        input: "Hello World!",
      },
    }),
  ],
  null,
  2,
);
