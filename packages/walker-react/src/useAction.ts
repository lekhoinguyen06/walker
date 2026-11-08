import { useStore } from "@nanostores/react";
import { $action } from "walker-dom";

export function useAction() {
  const action = useStore($action);
  return action;
}
