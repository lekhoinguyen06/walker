import { create } from "zustand";

export const TABS = ["home", "local", "config"] as const;

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
