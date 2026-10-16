import { create } from "zustand";

type LogStoreType = {
  logs: string[];
  pushLog: (log: string) => void;
};

export const useLogStore = create<LogStoreType>((set) => ({
  logs: [],
  pushLog: (log) => set((state) => ({ logs: [...state.logs, log] })),
}));

export function pushLog(log: string) {
  useLogStore.getState().pushLog(log);
}
