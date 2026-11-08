export interface Action<F extends string> {
  itemId: string;
  flowCommand: F;
  agentMessage: string;
  body: Record<string, unknown>;
}

export interface Hook<F extends string> {
  handler?: (action: Action<F>, ctx: Context<F>) => Promise<void> | void;
}

export interface Flow<F extends string> {
  command: F;
  description?: string;
  beforeHooks?: Hook<F>[];
  handler?: (action: Action<F>, context: Context<F>) => Promise<string | void>;
  afterHooks?: Hook<F>[];
}

export interface Item {
  id: string;
  state?: string;
}

export type Map = Item[];

export interface Context<F extends string> {
  prompt: string;
  flows: Flow<F>[];
  globalHooks?: {
    beforeHooks?: Hook<F>[];
    afterHooks?: Hook<F>[];
  };
}
