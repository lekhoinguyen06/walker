import { create } from "zustand";
import { persist } from "zustand/middleware";

export type WalkInputStore = {
  input: string;
  setInput: (input: string) => void;
};

export const useWalkInputStore = create<
  WalkInputStore,
  [["zustand/persist", WalkInputStore]]
>(
  persist(
    (set) => ({
      input: "",
      setInput: (input) => set({ input }),
    }),
    {
      name: "walker-input-storage",
    },
  ),
);
