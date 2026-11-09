import { useStore } from "@nanostores/react";
import { $action, type Action } from "walker-dom";

export function useAction() {
  const action = useStore($action);
  return {
    ...action,
    push: (action: Action) => {
      $action.set([...$action.get(), action]);
    },
  };
}
