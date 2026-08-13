import type { ActionType } from "@repo/core";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ActionStore = {
  actions: ActionType[];
  pushBack: (action: ActionType) => void;
  pushFront: (action: ActionType) => void;
  popBack: () => ActionType | undefined;
  popFront: () => ActionType | undefined;
  list: () => ActionType[];
  clear: () => ActionType[];
};

export const useActionStore = create<
  ActionStore,
  [["zustand/persist", ActionStore]]
>(
  persist(
    (set, get) => ({
      actions: [],

      pushBack: (action) =>
        set((state) => ({ actions: [...state.actions, action] })),

      pushFront: (action) =>
        set((state) => ({ actions: [action, ...state.actions] })),

      popBack: () => {
        const state = get();
        const action = state.actions[state.actions.length - 1];
        if (action) {
          set((state) => ({ actions: state.actions.slice(0, -1) }));
        }
        return action;
      },

      popFront: () => {
        const state = get();
        const action = state.actions[0];
        console.log("Popping front action: %O", action);
        if (action) {
          set((state) => ({ actions: state.actions.slice(1) }));
        }
        return action;
      },

      list: () => get().actions,

      clear: () => {
        const actions = get().actions;
        set(() => ({ actions: [] }));
        return actions;
      },
    }),
    {
      name: "action-storage",
    },
  ),
);
