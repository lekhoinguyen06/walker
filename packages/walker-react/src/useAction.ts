import { useStore } from "@nanostores/react";
import { $action, clearActions, pushAction, pushActions } from "walker-dom";

export function useAction() {
  const action = useStore($action);
  return {
    action,
    pushAction,
    pushActions,
    clear: clearActions,
  };
}
