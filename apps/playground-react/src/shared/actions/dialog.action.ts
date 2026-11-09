import { createAction } from "walker-dom";

export const dialogActionJSON = JSON.stringify(
  [
    createAction({
      flowCommand: "click",
      itemId: "dialog-trigger-open",
      agentMessage: "Let's see what we have here...",
      userMessage: "Demo example.",
      body: {},
    }),
    createAction({
      flow: "input",
      targetId: "name-input-field",
      body: {
        input: "Walker Jr.",
      },
      message: "Let's type in 'Walker Jr.'",
      prompt: "Demo example.",
      end: false,
    }),
    createAction({
      flow: "input",
      targetId: "username-input-field",
      body: {
        input: "@walker",
      },
      message: "Let's type in '@walker'",
      prompt: "Demo example.",
      end: false,
    }),
    createAction({
      flow: "click",
      targetId: "dialog-submit-button",
      message: "Nice! Let's save it!",
      prompt: "Demo example.",
      end: true,
    }),
  ],
  null,
  2,
);
