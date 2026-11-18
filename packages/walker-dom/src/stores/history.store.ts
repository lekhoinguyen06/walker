import { persistentJSON } from "@nanostores/persistent";
import type {
  ActionType,
  ContextType,
  HistoryItemType,
  MapType,
} from "walker-shared";
import { getUserPrompt } from "./user.store";

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
  ctx,
}: {
  action: ActionType;
  map: MapType;
  ctx: ContextType;
}) {
  const windowSize = ctx.historyWindowSize ?? 10;

  // Ignore informative flows when recording history
  if (action.flowCommand === "error" || action.flowCommand === "success") {
    return;
  }

  const history: HistoryItemType = {
    userPrompt: getUserPrompt(),
    action,
    map,
    logs: [],
    timestamp: String(new Date()),
  };

  console.log("[W][D] Recording history: ", history);

  if ($history.get().length >= windowSize) {
    $history.set([...$history.get().slice(1), history]);
  } else {
    $history.set([...$history.get(), history]);
  }
}

/**
 * Push log to the last history item's logs in the history store
 * @param log
 */
export function pushLog(log: string) {
  const histories = $history.get();
  histories[histories.length - 1]?.logs.push(log);
  $history.set(histories);
}
