import { persistentJSON } from "@nanostores/persistent";
import type {
  ActionType,
  ContextType,
  HistoryItemType,
  MapType,
} from "walker-shared";

export const $history = persistentJSON<HistoryItemType[]>(
  "walker-history-store",
  [],
);

export function clearHistory() {
  $history.set([]);
}

export function recordHistory({
  action,
  map,
  logs,
  ctx,
}: {
  action: ActionType;
  map: MapType;
  logs: string[];
  ctx: ContextType;
}) {
  const windowSize = ctx.historyWindowSize ?? 10;

  // Ignore informative flows when recording history
  if (action.flowCommand === "error" || action.flowCommand === "success") {
    return;
  }

  const history: HistoryItemType = {
    userPrompt: ctx.userPrompt,
    action,
    map,
    logs,
    timestamp: new Date(),
  };

  if ($history.get().length >= windowSize) {
    $history.set([...$history.get().slice(1), history]);
  } else {
    $history.set([...$history.get(), history]);
  }
}
