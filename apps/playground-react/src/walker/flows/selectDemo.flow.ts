import { pushAction, WalkerError } from "walker-dom";
import type { FlowWithHooksAndHandlerType } from "walker-shared";
import { z } from "zod";

export const SelectDemoFlowBodySchema = z.object({
  option: z.literal(["apple", "banana", "blueberry", "grapes", "pineapple"]),
});

export const selectDemoFlowBodyJSONSchema =
  SelectDemoFlowBodySchema.toJSONSchema();

export const selectDemoFlowBodyJSONSchemaStringify = JSON.stringify(
  selectDemoFlowBodyJSONSchema,
  null,
  2,
);

export const selectDemoFlow: FlowWithHooksAndHandlerType = {
  command: "select-demo",
  description: "Interact with select component.",
  handler: async (action) => {
    const valid = SelectDemoFlowBodySchema.safeParse(action.body);
    if (!valid.success) {
      throw new WalkerError(
        `Invalid flow body for select-demo flow, expected ${selectDemoFlowBodyJSONSchemaStringify}, received: ${JSON.stringify(action.body)}`,
      );
    }
    pushAction({
      flowCommand: "click",
      itemId: action.itemId,
      agentMessage: "Open select",
      userMessage: action.userMessage,
      systemMessage:
        "Opening select using click flow as part of select-demo flow",
      body: {},
    });
    pushAction({
      flowCommand: "click",
      itemId: action.itemId + `::${valid.data.option}`,
      agentMessage: "Select option: " + valid.data.option,
      userMessage: action.userMessage,
      systemMessage:
        "Selecting option using click flow as part of select-demo flow",
      body: {},
    });
  },
};
