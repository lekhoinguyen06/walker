import z from "zod";
import { ActionSchema } from "../action/action.dto";
import { MapSchema } from "../map/map.dto";
import { FlowSchema } from "../flow/flow.dto";

export const HistorySchema = z.object({
  prompt: z.string(),
  flow: FlowSchema.pick({
    command: true,
    description: true,
  }),
  action: ActionSchema,
  map: MapSchema,
  error: z.optional(z.string()),
});

export type HistoryType = z.infer<typeof HistorySchema>;
