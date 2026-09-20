import { create } from "zustand";
import { persist } from "zustand/middleware";

export type WalkerInputStore = {
  input: string;
  setInput: (input: string) => void;
};

export const useWalkerInputStore = create<
  WalkerInputStore,
  [["zustand/persist", WalkerInputStore]]
>(
  persist(
    (set) => ({
      input: "",
      setInput: (input) => set({ input }),
    }),
    {
      name: "walker-input-store",
    },
  ),
);
