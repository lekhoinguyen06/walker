import { create } from "zustand";

export type MouseStore = {
  x: number;
  y: number;
  setX: (x: number) => void;
  setY: (y: number) => void;
};

export const useMouseStore = create<MouseStore>((set) => ({
  x: 0,
  y: 0,
  setX: (x) => set({ x }),
  setY: (y) => set({ y }),
}));
