import {
  type ActionType,
  type FlowType,
  type HistoryType,
  type ItemType,
  type MapType,
} from "walker-shared";

export type Action = ActionType;
export type Flow = FlowType;
export type Item = ItemType;
export type Map = MapType;
export type HistoryItem = HistoryType;

export interface Hook {
  handler?: (action: Action, ctx: Context) => Promise<string | void>;
}

export interface FlowWithHooksAndHandler extends Flow {
  beforeHooks?: Hook[];
  handler?: (action: Action, context: Context) => Promise<string | void>;
  afterHooks?: Hook[];
}

export interface Context {
  userPrompt: string;
  flows: Flow[];
  globalHooks?: {
    beforeHooks?: Hook[];
    afterHooks?: Hook[];
  };
}
