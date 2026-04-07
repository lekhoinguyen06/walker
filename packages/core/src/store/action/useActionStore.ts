import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Action } from '@src/types/action.types';
import { ACTION_HISTORY_MAXIMUM_LENGTH } from '@src/constants/action.constants';

interface ActionStoreState {
  actions: Action[];
  history: Action[];
  addAction: (action: Action) => void;
  nextAction: () => Action | undefined;
  clearAction: () => void;
}

export const useActionStore = create<ActionStoreState>()(
  persist(
    (set, get) => ({
      actions: [],
      history: [],
      addAction: (action) =>
        set((state) => ({
          actions: [...state.actions, action],
        })),
      nextAction: () => {
        const { actions } = get();
        if (actions.length === 0) return undefined;

        const [first, ...rest] = actions;
        set(() => ({ actions: rest }));
        set((state) => ({
          history: [
            ...state.history.slice(-ACTION_HISTORY_MAXIMUM_LENGTH),
            first,
          ],
        }));
        return first;
      },
      clearAction: () => set(() => ({ actions: [] })),
    }),
    {
      name: 'action-store',
    },
  ),
);
