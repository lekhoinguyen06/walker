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
      message: "Open dialog",
      body: {},
    });
    pushAction({
      flowCommand: "input",
      itemId: action.itemId + `::input-name`,
      message: "Input name: " + valid.data.name,
      body: {
        input: valid.data.name,
      },
    });
    pushAction({
      flowCommand: "input",
      itemId: action.itemId + `::input-username`,
      message: "Input name: " + valid.data.username,
      body: {
        input: valid.data.username,
      },
    });
    if (valid.data.save) {
      pushAction({
        flowCommand: "click",
        itemId: action.itemId + `::save`,
        message: "Save dialog",
        body: {},
      });
    } else {
      pushAction({
        flowCommand: "none",
        itemId: "",
        message: "Please check the information before saving the dialog.",
        body: {},
      });
    }
  },
};
