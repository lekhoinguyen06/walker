import { type ActionType, type FlowType } from "walker-shared";

export interface HookType {
  handler?: (action: ActionType, ctx: ContextType) => Promise<string | void>;
}

export interface FlowWithHooksAndHandler extends FlowType {
  beforeHooks?: HookType[];
  handler?: (
    action: ActionType,
    context: ContextType,
  ) => Promise<string | void>;
  afterHooks?: HookType[];
}

export interface ContextType {
  userPrompt: string;
  flows: FlowType[];
  globalHooks?: {
    beforeHooks?: HookType[];
    afterHooks?: HookType[];
  };
  historyWindowSize?: number;
}
