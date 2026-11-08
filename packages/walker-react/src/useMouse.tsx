import { useStore } from "@nanostores/react";
import { $mouse } from "walker-dom";

export function useMouse() {
  const mouse = useStore($mouse);
  return {
    x: mouse.x,
    y: mouse.y,
    setX: (x: number) => {
      $mouse.set({ ...mouse, x });
    },
    setY: (y: number) => {
      $mouse.set({ ...mouse, y });
    },
  };
}
