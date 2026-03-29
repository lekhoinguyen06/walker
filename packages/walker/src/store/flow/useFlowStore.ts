import { create } from 'zustand';

interface ItemState {
  value: string;
}

export interface FlowStoreState {
  items: Record<string, ItemState>;
  updateItem: (id: string, value: string) => void;
}

export const useFlowStore = create<FlowStoreState>((set) => ({
  items: {},
  updateItem: (id, value) =>
    set((state) => ({
      items: {
        ...state.items,
        [id]: { value },
      },
    })),
}));
