import { createAction } from "walker-react/core";

export const dialogActionJSON = JSON.stringify(
  [
    createAction({
      flow: "click",
      targetId: "dialog-trigger",
      message: "Let's see what we have here...",
      prompt: "Demo example.",
      end: false,
    }),
    createAction({
      flow: "input",
      targetId: "name-input",
      body: {
        input: "Walker Jr.",
      },
      message: "Let's type in 'Walker Jr.'",
      prompt: "Demo example.",
      end: false,
    }),
    createAction({
      flow: "input",
      targetId: "username-input",
      body: {
        input: "@walker",
      },
      message: "Let's type in '@walker'",
      prompt: "Demo example.",
      end: false,
    }),
    createAction({
      flow: "click",
      targetId: "dialog-save",
      message: "Nice! Let's save it!",
      prompt: "Demo example.",
      end: true,
    }),
  ],
  null,
  2,
);
