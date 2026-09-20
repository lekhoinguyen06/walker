import { useMouseStore } from "@/stores/adapters";

export function useMouse() {
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
