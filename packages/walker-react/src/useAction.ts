import { useStore } from "@nanostores/react";
import { $action } from "walker-dom";
import type { ActionType } from "walker-shared";

export function useAction() {
  const action = useStore($action);
  return {
    ...action,
    push: (action: ActionType) => {
      $action.set([...$action.get(), action]);
    },
  };
}
