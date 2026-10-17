import { create } from "zustand";

type TabOption = {
  value: string;
  label: string;
};

export const TABS = [
  { value: "home", label: "Home" },
  { value: "local", label: "Local" },
  { value: "config", label: "Config" },
] as const satisfies TabOption[];

export type TabType = (typeof TABS)[number]["value"];

type TabStoreType = {
  tab: TabType;
  setTab: (tab?: TabType) => void;
};

export const useTabStore = create<TabStoreType>((set) => ({
  tab: "home",
  setTab: (tab) => set({ tab: tab || "home" }),
}));

export function isTab(tab?: string): TabType {
  return TABS.some((t) => t.value === tab) ? (tab as TabType) : "home";
}

export function setTab(tab?: TabType) {
  useTabStore.getState().setTab(tab);
}
