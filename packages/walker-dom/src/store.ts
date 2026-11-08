import { persistentJSON } from "@nanostores/persistent";
import { nanoquery } from "@nanostores/query";
import type { Action, Context, HistoryItem } from "./type";
import { walk } from "./walk";
import { atom } from "nanostores";

export const [createFetcherStore, createMutatorStore] = nanoquery({
  fetcher: (...keys) => fetch(keys.join("")).then((r) => r.json()),
});

export const $action = persistentJSON<Action[]>("walker-action-store", []);

export const $mouse = atom<{
  x: number;
  y: number;
}>({ x: 0, y: 0 });

export const $history = persistentJSON<HistoryItem[]>(
  "walker-history-store",
  [],
);

export const $walk = createMutatorStore<Context>(async ({ data }) => {
  const history = await walk(data);
  $history.set([...$history.get(), history]);
  return { data };
});
