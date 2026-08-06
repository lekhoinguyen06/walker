import z from "zod";
import { ActionSchema } from "../action/type";

// --- Action Store ---
export const ActionStorePushHandler = z.function({
  input: [ActionSchema],
  output: z.void(),
});

export const ActionStorePopHandler = z.function({
  input: [],
  output: z.optional(ActionSchema),
});

export const ActionStoreReturnManyHandler = z.function({
  input: [],
  output: z.array(ActionSchema),
});

export const ActionStoreSchema = z.object({
  pushBack: ActionStorePushHandler,
  pushFront: ActionStorePushHandler,
  popBack: ActionStorePopHandler,
  popFront: ActionStorePopHandler,
  list: ActionStoreReturnManyHandler,
  clear: ActionStoreReturnManyHandler,
});

export const ConfigSchema = z.object({
  mode: z.enum(["tailored", "open"]).catch("tailored"),
  gap: z.number().catch(0),
  isPaused: z.boolean().catch(false),
  verbose: z.boolean().catch(false),
  url: z.string().optional(),
});

export const AdapterSchema = z.object({
  actionStore: ActionStoreSchema,
  historyStore: ActionStoreSchema,
});

export type ConfigType = z.infer<typeof ConfigSchema>;
export type AdapterType = z.infer<typeof AdapterSchema>;
