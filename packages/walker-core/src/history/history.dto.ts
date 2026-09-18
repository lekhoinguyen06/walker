import z from "zod";
import { ActionSchema } from "../action";
import { MapSchema } from "../map";
import { FlowSchema } from "../flow";

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
