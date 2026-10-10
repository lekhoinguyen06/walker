import z from "zod";
import { FlowItemSchema } from "./flow.dto";
import { ActionSchema } from "./action.dto";
import { MapSchema } from "./map.dto";

export const LogItemSchema = z.object({
  type: z.literal(["user", "system"]),
  message: z.string(),
  timestamp: z.number(),
});

export const HistorySchema = z.object({
  prompt: z.string(),
  flow: FlowItemSchema,
  action: ActionSchema,
  map: MapSchema,
  logs: z.array(LogItemSchema),
});

export type HistoryType = z.infer<typeof HistorySchema>;
export type LogItemType = z.infer<typeof LogItemSchema>;
