import z from "zod";
import { ActionSchema } from "../action/action.dto";
import { MapSchema } from "../map/map.dto";
import { FlowsSchema } from "../flow/flow.dto";
import { ObservedAttributes } from "./walk.const";

export const ObservedAttributesSchema = z.enum(ObservedAttributes);

export const HistorySchema = z.object({
  id: z.string(),
  prompt: z.string(),
  flows: FlowsSchema,
  action: ActionSchema,
  map: MapSchema,
});

export const WalkSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  history: HistorySchema,
});

export type ObservedAttributesType = z.infer<typeof ObservedAttributesSchema>;
export type WalkType = z.infer<typeof WalkSchema>;
