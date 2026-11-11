import { nanoquery } from "@nanostores/query";
import type { ContextType } from "walker-shared";
import { walk } from "../walk";
import { $history } from "./history.store";

export const [createFetcherStore, createMutatorStore] = nanoquery({
  fetcher: (...keys) => fetch(keys.join("")).then((r) => r.json()),
});

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
