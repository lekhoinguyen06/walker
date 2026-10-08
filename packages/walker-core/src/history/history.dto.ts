import { ActionSchema, type ActionType } from "../action";
import { MapSchema, type MapType } from "../map";
import { FlowItemSchema, type FlowItemType } from "../flow";
import z from "zod";

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
