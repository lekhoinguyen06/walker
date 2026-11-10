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
