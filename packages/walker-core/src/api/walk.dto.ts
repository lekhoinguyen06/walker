import z from "zod";
import { HistorySchema } from "../history";
import { FlowItemSchema } from "../flow";
import { MapSchema } from "../map";
import { ActionSchema } from "../action";

export const WalkRequestBodySchema = z.object({
  history: HistorySchema,
  flows: z.array(FlowItemSchema),
  map: MapSchema,
  skills: z.array(z.string()),
  prompt: z.string(),
});

export const WalkResponseBodySchema = z.object({
  action: ActionSchema,
  metadata: z.object({
    timestamp: z.date(),
    usage: z.record(z.string(), z.number()),
  }),
});

export type WalkRequestBodyType = z.infer<typeof WalkRequestBodySchema>;
export type WalkResponseBodyType = z.infer<typeof WalkResponseBodySchema>;
