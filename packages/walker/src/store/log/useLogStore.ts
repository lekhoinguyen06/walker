import { create, type StoreApi, type UseBoundStore } from "zustand";
import { persist } from "zustand/middleware";
import type { LogItem } from "../../types/log.types";

interface LogStoreState {
	items: LogItem[];
	addItem: (id: string, value: LogItem) => void;
	clearItems: () => void;
}

export type LogStoreType = UseBoundStore<StoreApi<LogStoreState>>;

export const useLogStore = create<LogStoreState>()(
	persist(
		(set) => ({
			items: [],
			addItem: (id, value) =>
				set((state) => ({
					items: [...state.items, { ...value, id }],
				})),
			clearItems: () => set({ items: [] }),
		}),
		{
			name: "log-store",
		},
	),
);
