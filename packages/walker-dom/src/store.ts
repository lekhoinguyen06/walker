import { persistentJSON } from "@nanostores/persistent";
import { nanoquery } from "@nanostores/query";
import type { Action } from "./type";

export const [createFetcherStore, createMutatorStore] = nanoquery({
  fetcher: (...keys) => fetch(keys.join("")).then((r) => r.json()),
});

export const $action = persistentJSON<Action<string>[]>(
  "walker-action-store",
  [],
);

export const $history = persistentJSON<Action<string>[]>(
  "walker-history-store",
  [],
);

export const $walk = createMutatorStore<Action<string>>(async ({ data }) => {
  return {
    data,
  };
});
