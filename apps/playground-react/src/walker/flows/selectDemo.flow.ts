import { pushAction, WalkerError } from "walker-dom";
import type { FlowWithHooksAndHandlerType } from "walker-shared";
import { z } from "zod";

export const SelectDemoFlowBodySchema = z.object({
  option: z.literal(["apple", "banana", "blueberry", "grapes", "pineapple"]),
});

export const selectDemoFlowBodyJSONSchema =
  SelectDemoFlowBodySchema.toJSONSchema();

export const selectDemoFlowBodyJSONSchemaStringified = JSON.stringify(
  selectDemoFlowBodyJSONSchema,
  null,
  2,
);

export const selectDemoFlow: FlowWithHooksAndHandlerType = {
  command: "select-demo",
  description: "Interact with select component.",
  Schema: selectDemoFlowBodyJSONSchemaStringified,
  handler: async (action) => {
    const valid = SelectDemoFlowBodySchema.safeParse(action.body);
    if (!valid.success) {
      throw new WalkerError(
        `Invalid flow body for select-demo flow, expected ${selectDemoFlowBodyJSONSchemaStringified}, received: ${JSON.stringify(action.body)}`,
      );
    }
    pushAction({
      flowCommand: "click",
      itemId: action.itemId,
      message: "Open select",
      body: {},
    });
    pushAction({
      flowCommand: "click",
      itemId: action.itemId + `::${valid.data.option}`,
      message: "Select option: " + valid.data.option,
      body: {},
    });
  },
};
