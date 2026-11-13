import { type InputFlow, pushAction, WalkerError } from "walker-dom";
import type { FlowWithHooksAndHandlerType } from "walker-shared";
import { z } from "zod";
import { ade } from "../ade";

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

export type DialogDemoFlow = z.infer<typeof DialogDemoFlowBodySchema>;

export const dialogDemoFlow: FlowWithHooksAndHandlerType = {
  command: "dialog-demo",
  description: "Interact with dialog component.",
  schema: dialogDemoFlowBodyJSONSchemaStringified,
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
      itemId: ade.pdt().id,
      message: "Open dialog",
      body: {},
    });
    pushAction<InputFlow>({
      flowCommand: "input",
      itemId: ade.pdin().id,
      message: "Input name: " + valid.data.name,
      body: {
        text: valid.data.name,
      },
    });
    pushAction<InputFlow>({
      flowCommand: "input",
      itemId: ade.pdiu().id,
      message: "Input name: " + valid.data.username,
      body: {
        text: valid.data.username,
      },
    });
    if (valid.data.save) {
      pushAction({
        flowCommand: "click",
        itemId: ade.pds().id,
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
