import z from "zod";
import {
  MapSchema,
  ActionSchema,
  FlowSchema,
  HistoryItemSchema,
} from "walker-shared";

export const WalkRequestBodySchema = z.object({
  histories: z.array(HistoryItemSchema),
  flows: z.array(FlowSchema),
  map: MapSchema,
  skills: z.array(z.string()),
  userPrompt: z.string(),
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
