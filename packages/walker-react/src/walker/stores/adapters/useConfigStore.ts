import type { ContextType } from "walker-core";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ConfigStore = {
  config: ContextType["config"];
  setConfig: (config: ContextType["config"]) => void;
  updateConfig: (config: Partial<ContextType["config"]>) => void;
  clearConfig: () => void;
};

export const useConfigStore = create<
  ConfigStore,
  [["zustand/persist", ConfigStore]]
>(
  persist(
    (set, get) => ({
      config: {
        gap: 200,
        isLoading: false,
        loop: false,
        verbose: false,
        url: "",
      },
      setConfig: (config) => set({ config }),
      updateConfig: (config) => set({ config: { ...get().config, ...config } }),
      clearConfig: () => set({ config: {} as ContextType["config"] }),
    }),
    {
      name: "walker-config-store",
    },
  ),
);
