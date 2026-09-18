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

export function useMouseOffset() {
  const x = useMouseStore((state) => state.x);
  const y = useMouseStore((state) => state.y);
  const setX = useMouseStore((state) => state.setX);
  const setY = useMouseStore((state) => state.setY);

  return {
    x,
    y,
    setX,
    setY,
  };
}
