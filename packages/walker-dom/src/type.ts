export interface Action {
  itemId: string;
  flowCommand: string;
  agentMessage: string;
  body: Record<string, unknown>;
}

export interface Hook {
  handler?: (action: Action, ctx: Context) => Promise<string | void>;
}

export interface Flow {
  command: string;
  description?: string;
  beforeHooks?: Hook[];
  handler?: (action: Action, context: Context) => Promise<string | void>;
  afterHooks?: Hook[];
}

export interface Item {
  id: string;
  state?: string;
}

export type Map = Item[];

export interface Context {
  prompt: string;
  flows: Flow[];
  globalHooks?: {
    beforeHooks?: Hook[];
    afterHooks?: Hook[];
  };
}

export interface HistoryItem {
  action: Action;
  map: Map;
  logs: string[];
  timestamp: number;
}
