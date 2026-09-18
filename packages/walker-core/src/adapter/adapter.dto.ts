import type { ActionType } from "../action";
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

// --- Mouse Store Adapter ---
export interface MouseAdapterType {}

export interface AdapterType {
  actionStore: ActionStoreAdapterType;
  historyStore: HistoryStoreAdapterType;
}
