import z from "zod";
import {
  HistorySchema,
  FlowItemSchema,
  MapSchema,
  ActionSchema,
} from "walker-core";

export const WalkRequestBodySchema = z.object({
  history: z.array(HistorySchema),
  flows: z.array(FlowItemSchema),
  map: MapSchema,
  skills: z.array(z.string()),
  prompt: z.string(),
});

export const WalkResponseBodySchema = z.object({
  action: ActionSchema,
  metadata: z.object({
    timestamp: z.date(),
    usage: z.record(z.string(), z.any()),
  }),
});

export type WalkRequestBodyDTO = z.infer<typeof WalkRequestBodySchema>;
export type WalkResponseBodyDTO = z.infer<typeof WalkResponseBodySchema>;
