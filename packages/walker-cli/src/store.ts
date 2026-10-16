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

const TABS = ["home", "local", "config"] as const;

type TabType = (typeof TABS)[number];

type TabStoreType = {
  tab: TabType;
  setTab: (tab?: TabType) => void;
};

export const useTabStore = create<TabStoreType>((set) => ({
  tab: "home",
  setTab: (tab) => set({ tab: tab || "home" }),
}));

export function isTab(tab?: string): TabType {
  return TABS.includes(tab as TabType) ? (tab as TabType) : "home";
}

export function setTab(tab?: TabType) {
  useTabStore.getState().setTab(tab);
}
