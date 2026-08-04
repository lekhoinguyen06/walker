import z from "zod";
import { ActionSchema } from "../action/type";
import { FlowSchema } from "../flow/type";
import { webFlows } from "../flow/web";

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

// --- Flow Store ---
export const FlowStoreInitHandler = z.function({
  input: [z.array(FlowSchema)],
  output: z.void(),
});

export const FlowStoreReturnManyHandler = z.function({
  input: [],
  output: z.array(FlowSchema),
});

export const FlowStoreFindHandler = z.function({
  input: [z.object({ command: z.string() })],
  output: z.optional(FlowSchema),
});

export const FlowStoreSchema = z.object({
  init: FlowStoreInitHandler,
  find: FlowStoreFindHandler,
  list: FlowStoreReturnManyHandler,
  clear: FlowStoreReturnManyHandler,
});

export const ConfigSchema = z.object({
  mode: z.enum(["tailored", "open"]),
  url: z.url().optional(),
  gap: z.number().optional().default(1000),
  isPaused: z.boolean().optional().default(false),
  verbose: z.boolean().optional().default(false),
  flows: z.array(FlowSchema).optional().default([]),
});

export const AdapterConfigSchema = z.object({
  actionStore: ActionStoreSchema,
  historyStore: ActionStoreSchema,
});

export type ConfigType = z.infer<typeof ConfigSchema>;
export type AdapterConfigType = z.infer<typeof AdapterConfigSchema>;
