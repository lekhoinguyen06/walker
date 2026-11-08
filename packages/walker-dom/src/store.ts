import { persistentJSON } from "@nanostores/persistent";
import { nanoquery } from "@nanostores/query";
import type { Action, Context, HistoryItem } from "./type";
import { walk } from "./walk";

export const [createFetcherStore, createMutatorStore] = nanoquery({
  fetcher: (...keys) => fetch(keys.join("")).then((r) => r.json()),
});

export const $history = persistentJSON<HistoryItem<string>[]>(
  "walker-history-store",
  [],
);

export const $walk = createMutatorStore<Context<string>>(async ({ data }) => {
  const history = await walk(data);
  $history.set([...$history.get(), history]);
  return { data };
});
