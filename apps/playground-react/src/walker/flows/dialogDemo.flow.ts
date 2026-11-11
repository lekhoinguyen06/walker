import { pushAction, WalkerError } from "walker-dom";
import type { FlowWithHooksAndHandlerType } from "walker-shared";
import { z } from "zod";

export const DialogDemoFlowBodySchema = z.object({
  name: z.string(),
  username: z.string(),
  save: z.boolean(),
});

export const dialogDemoFlowBodyJSONSchema =
  DialogDemoFlowBodySchema.toJSONSchema();

export const dialogDemoFlowBodyJSONSchemaStringified = JSON.stringify(
  dialogDemoFlowBodyJSONSchema,
  null,
  2,
);

export const dialogDemoFlow: FlowWithHooksAndHandlerType = {
  command: "dialog-demo",
  description: "Interact with dialog component.",
  handler: async (action) => {
    const valid = DialogDemoFlowBodySchema.safeParse(action.body);
    console.log("Dialog demo flow");
    if (!valid.success) {
      throw new WalkerError(
        `Invalid flow body for dialog-demo flow, expected ${dialogDemoFlowBodyJSONSchemaStringified}, received: ${JSON.stringify(action.body)}`,
      );
    }
    pushAction({
      flowCommand: "click",
      itemId: action.itemId + `::trigger`,
      agentMessage: "Open dialog",
      userMessage: action.userMessage,
      systemMessage:
        "Opening dialog using click flow as part of dialog-demo flow",
      body: {},
    });
    pushAction({
      flowCommand: "input",
      itemId: action.itemId + `::input-name`,
      agentMessage: "Input name: " + valid.data.name,
      userMessage: action.userMessage,
      systemMessage: "Input name using input flow as part of dialog-demo flow",
      body: {
        input: valid.data.name,
      },
    });
    pushAction({
      flowCommand: "input",
      itemId: action.itemId + `::input-username`,
      agentMessage: "Input name: " + valid.data.username,
      userMessage: action.userMessage,
      systemMessage:
        "Input username using input flow as part of dialog-demo flow",
      body: {
        input: valid.data.username,
      },
    });
    if (valid.data.save) {
      pushAction({
        flowCommand: "click",
        itemId: action.itemId + `::save`,
        agentMessage: "Save dialog",
        userMessage: action.userMessage,
        systemMessage: "Save using click flow as part of dialog-demo flow",
        body: {},
      });
    } else {
      pushAction({
        flowCommand: "none",
        itemId: "",
        agentMessage: "Please check the information before saving the dialog.",
        userMessage: action.userMessage,
        systemMessage:
          "Toast confirmation message using none flow as part of dialog-demo flow",
        body: {},
      });
    }
  },
};
