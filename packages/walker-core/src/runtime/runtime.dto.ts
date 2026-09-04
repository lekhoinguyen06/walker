import z from "zod";
import { ActionSchema } from "../action/action.dto";
import { HookFactory, HooksSchema } from "../hook/hook.dto";
import { FlowsSchema } from "../flow/flow.dto";
import { ConfigSchema } from "../config/config.dto";
import { Runtime } from ".";
import { HistorySchema } from "../history/history.dto";

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

// --- History Store ---
export const HistoryStorePushHandler = z.function({
  input: [HistorySchema],
  output: z.void(),
});

export const HistoryStoreUpdateHandler = z.function({
  input: [HistorySchema.partial()],
  output: z.void(),
});

export const HistoryStorePopHandler = z.function({
  input: [],
  output: z.optional(HistorySchema),
});

export const HistoryStoreReturnManyHandler = z.function({
  input: [],
  output: z.array(HistorySchema),
});

export const HistoryStoreSchema = z.object({
  updateBack: HistoryStoreUpdateHandler,
  pushBack: HistoryStorePushHandler,
  pushFront: HistoryStorePushHandler,
  popBack: HistoryStorePopHandler,
  popFront: HistoryStorePopHandler,
  list: HistoryStoreReturnManyHandler,
  clear: HistoryStoreReturnManyHandler,
});

export const AdapterSchema = z.object({
  actionStore: ActionStoreSchema,
  historyStore: HistoryStoreSchema,
});

export const RuntimePropsSchema = z.object({
  config: ConfigSchema,
  adapter: AdapterSchema,
  flows: FlowsSchema,
  hooks: HooksSchema,
});

export type AdapterType = z.infer<typeof AdapterSchema>;
export type RuntimePropsType = z.infer<typeof RuntimePropsSchema>;
export type RuntimeType = typeof Runtime;
