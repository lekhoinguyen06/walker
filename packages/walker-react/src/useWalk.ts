import { useStore } from "@nanostores/react";
import { $walk } from "walker-dom";

export function useWalk() {
  const walk = useStore($walk);
  return walk;
}
