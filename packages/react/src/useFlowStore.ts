import type { ActionType, FlowType } from "@repo/core";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FlowStore = {
  flows: FlowType[];
  init: (flows: FlowType[]) => void;
  find: ({ command }: { command: string }) => FlowType | undefined;
  list: () => FlowType[];
  clear: () => FlowType[];
};

export const useFlowStore = create<FlowStore, [["zustand/persist", FlowStore]]>(
  persist(
    (set, get) => ({
      flows: [],

      init: (flows) => set(() => ({ flows })),

      find: ({ command }) =>
        get().flows.find((flow) => flow.command === command),

      list: () => get().flows,

      clear: () => {
        const flows = get().flows;
        set(() => ({ flows: [] }));
        return flows;
      },
    }),
    {
      name: "flow-storage",
    },
  ),
);
