import { useStore } from "@nanostores/react";
import { $action } from "walker-dom";
import { ActionSchema, type ActionType } from "walker-shared";

export function useAction() {
  const action = useStore($action);
  return {
    action,
    pushAction: (action: ActionType) => {
      const parsedAction = ActionSchema.safeParse(action);
      if (parsedAction.success) {
        $action.set([...$action.get(), parsedAction.data]);
      } else {
        console.error(
          "Invalid action:",
          JSON.stringify(parsedAction.error.message, null, 2),
        );
      }
    },
    pushActions: (actions: ActionType[]) => {
      const parsedActions = actions.map((action) =>
        ActionSchema.safeParse(action),
      );
      const validActions = parsedActions
        .filter((result) => result.success)
        .map((result) => (result as { success: true; data: ActionType }).data);
      if (validActions.length > 0) {
        $action.set([...$action.get(), ...validActions]);
      }
    },
    clear: () => {
      $action.set([]);
    },
  };
}
