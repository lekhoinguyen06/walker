import z from "zod";
import { ActionSchema } from "./action.dto";
import { MapSchema } from "./map.dto";

export const HistorySchema = z.object({
  action: ActionSchema,
  map: MapSchema,
  logs: z.array(z.string()),
  timestamp: z.date(),
});

export type HistoryType = z.infer<typeof HistorySchema>;
