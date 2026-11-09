import { persistentJSON } from "@nanostores/persistent";
import { nanoquery } from "@nanostores/query";
import { walk } from "./walk";
import { atom } from "nanostores";
import type { ActionType, ContextType, HistoryItemType } from "walker-shared";

export const [createFetcherStore, createMutatorStore] = nanoquery({
  fetcher: (...keys) => fetch(keys.join("")).then((r) => r.json()),
});

export const $action = persistentJSON<ActionType[]>("walker-action-store", []);

export const $mouse = atom<{
  x: number;
  y: number;
}>({ x: 0, y: 0 });

export const $history = persistentJSON<HistoryItemType[]>(
  "walker-history-store",
  [],
);

export const $walk = createMutatorStore<ContextType>(async ({ data }) => {
  const history = await walk(data);
  const historyWindowSize = data.historyWindowSize ?? 3;
  if ($history.get().length >= historyWindowSize) {
    $history.set([...$history.get().slice(1), history]);
  } else {
    $history.set([...$history.get(), history]);
  }
  return { data };
});
