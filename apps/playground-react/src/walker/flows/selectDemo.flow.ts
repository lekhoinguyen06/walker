import { pushAction, WalkerError } from "walker-dom";
import type { FlowWithHooksAndHandlerType } from "walker-shared";
import { z } from "zod";
import { ade } from "../ade";

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

export type SelectDemoFlow = z.infer<typeof SelectDemoFlowBodySchema>;

export const selectDemoFlow: FlowWithHooksAndHandlerType = {
  command: "select-demo",
  description: "Interact with select component.",
  schema: selectDemoFlowBodyJSONSchemaStringified,
  handler: async (action) => {
    const valid = SelectDemoFlowBodySchema.safeParse(action.body);
    if (!valid.success) {
      throw new WalkerError(
        `Invalid flow body for select-demo flow, expected ${selectDemoFlowBodyJSONSchemaStringified}, received: ${JSON.stringify(action.body)}`,
      );
    }
    pushAction({
      flowCommand: "click",
      itemId: ade.pss().id,
      message: "Open select",
      body: {},
    });
    pushAction({
      flowCommand: "click",
      itemId: ade.psso(valid.data.option).id,
      message: "Select option: " + valid.data.option,
      body: {},
    });
  },
};
