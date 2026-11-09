import { useStore } from "@nanostores/react";
import { $mouseX, $mouseY } from "walker-dom";

export function useMouse() {
  const mouseX = useStore($mouseX);
  const mouseY = useStore($mouseY);
  return {
    x: mouseX,
    y: mouseY,
    setX: (x: number) => {
      $mouseX.set(x);
    },
    setY: (y: number) => {
      $mouseY.set(y);
    },
  };
}
