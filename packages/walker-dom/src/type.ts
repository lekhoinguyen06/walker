import { type ActionType, type FlowType } from "walker-shared";

export interface Hook {
  handler?: (action: ActionType, ctx: Context) => Promise<string | void>;
}

export interface FlowWithHooksAndHandler extends FlowType {
  beforeHooks?: Hook[];
  handler?: (action: ActionType, context: Context) => Promise<string | void>;
  afterHooks?: Hook[];
}

export interface Context {
  userPrompt: string;
  flows: FlowType[];
  globalHooks?: {
    beforeHooks?: Hook[];
    afterHooks?: Hook[];
  };
  historyWindowSize?: number;
}
