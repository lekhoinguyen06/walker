import { type ActionType } from "../action";
import { type WebHooksType } from "../hook";
import { type FlowRegistry, type FlowType } from "../flow";
import { type ConfigType } from "../config";
import { Runtime } from "./index";
import type { HistoryType } from "../history";

// --- Action Store Adapter ---
export interface ActionStoreAdapterType {
  pushBack: (action: ActionType) => void;
  pushFront: (action: ActionType) => void;
  popBack: () => ActionType | undefined;
  popFront: () => ActionType | undefined;
  list: () => ActionType[];
  clear: () => void;
}

// --- History Store Adapter ---
export interface HistoryStoreAdapterType {
  pushLog: (log: string) => void;
  pushBack: (history: HistoryType) => void;
  pushFront: (history: HistoryType) => void;
  popBack: () => HistoryType | undefined;
  popFront: () => HistoryType | undefined;
  list: () => HistoryType[];
  clear: () => void;
}

export interface AdapterType {
  actionStore: ActionStoreAdapterType;
  historyStore: HistoryStoreAdapterType;
}

export interface RuntimePropsType {
  config: ConfigType;
  adapter: AdapterType;
  flows: FlowRegistry;
  hooks: WebHooksType;
}

export type RuntimeType = typeof Runtime;
