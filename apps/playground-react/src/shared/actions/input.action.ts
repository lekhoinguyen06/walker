import { createAction } from "walker-react/core";

export const inputActionJSON: string = JSON.stringify(
  [
    createAction({
      flow: "input",
      targetId: "input",
      message: "Let's type in 'Hello World!'",
      body: {
        input: "Hello World!",
      },
      end: true,
      prompt: "No prompt. This is the Action from the demo section.",
    }),
  ],
  null,
  2,
);
