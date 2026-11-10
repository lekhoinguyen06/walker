import { createAction } from "walker-dom";

export const dialogActionJSON = JSON.stringify(
  [
    createAction({
      flowCommand: "click",
      itemId: "walker-dialog-trigger-open",
      agentMessage: "Let's see what we have here...",
      userMessage: "Demo example.",
      body: {},
    }),
    createAction({
      flowCommand: "input",
      itemId: "walker-name-input-field",
      agentMessage: "Let's type in 'Walker Jr.'",
      userMessage: "Demo example.",
      body: {
        input: "Walker Jr.",
      },
    }),
    createAction({
      flowCommand: "input",
      itemId: "walker-username-input-field",
      agentMessage: "Let's type in '@walker'",
      userMessage: "Demo example.",
      body: {
        input: "@walker",
      },
    }),
    createAction({
      flowCommand: "click",
      itemId: "walker-dialog-submit-button",
      agentMessage: "Nice! Let's save it!",
      userMessage: "Demo example.",
      body: {},
    }),
  ],
  null,
  2,
);
