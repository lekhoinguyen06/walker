import type {
  HistoryStoreAdapterType,
  HistoryType,
  LogItemType,
} from "walker-core";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface HistoryStore extends HistoryStoreAdapterType {
  history: HistoryType[];
}

export const useHistoryStore = create<
  HistoryStore,
  [["zustand/persist", HistoryStore]]
>(
  persist(
    (set, get) => ({
      history: [],

      pushLog: (log) => {
        const state = get();
        const lastItem = state.history[state.history.length - 1];
        if (lastItem) {
          set((state) => ({
            history: [
              ...state.history.slice(0, -1),
              { ...lastItem, logs: [...lastItem.logs, log] },
            ],
          }));
        }
      },

      pushBack: (item) =>
        set((state) => ({
          history: [
            ...state.history.slice(
              state.history.length - 5,
              state.history.length,
            ),
            item,
          ],
        })),

      pushFront: (item) =>
        set((state) => ({ history: [item, ...state.history.slice(0, 5)] })),

      popBack: () => {
        const state = get();
        const item = state.history[state.history.length - 1];
        if (item) {
          set((state) => ({ history: state.history.slice(0, -1) }));
        }
        return item;
      },

      popFront: () => {
        const state = get();
        const item = state.history[0];
        if (item) {
          set((state) => ({ history: state.history.slice(1) }));
        }
        return item;
      },

      list: () => get().history,

      clear: () => {
        const history = get().history;
        set(() => ({ history: [] }));
        return history;
      },
    }),
    {
      name: "walker-history-store",
    },
  ),
);
