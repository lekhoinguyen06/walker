import type { Action, Item } from "./type";

export function idsUnique(items: Item[]): void {
  const ids = items.map((item) => item.id);
  if (new Set(ids).size !== ids.length) {
    throw new Error("Item ids must be unique");
  }
}

export function actionItemIdExist(action: Action<string>, items: Item[]): void {
  if (items.some((item) => item.id !== action.itemId)) {
    throw new Error(`Action itemId ${action.itemId} does not exist in items`);
  }
}
