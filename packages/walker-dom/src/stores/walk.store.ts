import { nanoquery } from "@nanostores/query";
import type { ContextType } from "walker-shared";
import { walk } from "../walk";
import { $history } from "./history.store";

export const [createFetcherStore, createMutatorStore] = nanoquery({
  fetcher: (...keys) => fetch(keys.join("")).then((r) => r.json()),
});

export const $walk = createMutatorStore<ContextType>(async ({ data }) => {
  await walk(data);
  return { data };
});
