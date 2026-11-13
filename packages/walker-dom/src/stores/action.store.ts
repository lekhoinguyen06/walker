import { persistentJSON } from "@nanostores/persistent";
import { ActionSchema, type ActionType } from "walker-shared";
import z from "zod";

export const $action = persistentJSON<ActionType[]>("walker-action-store", []);

export function pushAction<T extends Record<string, unknown>>(
  action: ActionType<T>,
) {
  const parsedAction = ActionSchema.safeParse(action);
  if (!parsedAction.success) {
    throw new Error(
      `Invalid Action: ${JSON.stringify(parsedAction.error.message, null, 2)}`,
    );
  }
  const actionsInQueue = $action.get();
  $action.set([...actionsInQueue, parsedAction.data]);
}

export function pushActions(actions: ActionType[]) {
  const parsedActions = z.array(ActionSchema).safeParse(actions);
  if (!parsedActions.success) {
    throw new Error(
      `Invalid Actions: ${JSON.stringify(parsedActions.error.message, null, 2)}`,
    );
  }
  const actionsInQueue = $action.get();
  $action.set([...actionsInQueue, ...parsedActions.data]);
}

export function clearActions() {
  $action.set([]);
}
