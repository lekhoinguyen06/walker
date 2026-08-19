import z from "zod";
import { ActionSchema } from "../action/action.dto";
import { HookFactory, HooksSchema } from "../hook/hook.dto";
import { FlowsSchema } from "../flow/flow.dto";
import { ConfigSchema } from "../config/config.dto";
import { Runtime } from ".";

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

export const AdapterSchema = z.object({
  actionStore: ActionStoreSchema,
  historyStore: ActionStoreSchema,
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
