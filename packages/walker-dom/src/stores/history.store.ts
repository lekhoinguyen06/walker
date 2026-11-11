import { persistentJSON } from "@nanostores/persistent";
import type { HistoryItemType } from "walker-shared";

export const $history = persistentJSON<HistoryItemType[]>(
  "walker-history-store",
  [],
);

export function clearHistory() {
  $history.set([]);
}
