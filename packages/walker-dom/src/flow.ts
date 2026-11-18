import type {
  ActionType,
  ContextType,
  HistoryItemType,
  MapType,
} from "walker-shared";
import { wait } from "./utils";
import { $action, pushLog, recordHistory } from "./stores";
import { walk } from "./walk";
import { WALKER_MISTAKE_MSG, WalkerError } from "./error";

export async function executeFlow({
  action,
  ctx,
  logs,
  map,
}: {
  action: ActionType;
  ctx: ContextType;
  logs: string[];
  map: MapType;
}): Promise<void> {
  const flow = ctx.flows.find((flow) => flow.command === action.flowCommand);
  console.log("[W][D]: Flow found for action.flowCommand: ", flow);
  if (flow) {
    const gap = ctx.gapTimeMs ?? 100;
    for (const hook of ctx.globalHooks?.beforeHooks ?? []) {
      const l = await hook.handler?.(action, ctx);
      l && logs.push(String(l));
      await wait(gap);
    }
    await wait(gap);
    for (const hook of flow.beforeHooks ?? []) {
      const l = await hook.handler?.(action, ctx);
      l && logs.push(String(l));
      await wait(gap);
    }
    await wait(1000);
    const l = await flow.handler?.(action, ctx);
    l && logs.push(String(l));
    await wait(gap);
    for (const hook of flow.afterHooks ?? []) {
      const l = await hook.handler?.(action, ctx);
      l && logs.push(String(l));
      await wait(gap);
    }
    await wait(gap);
    for (const hook of ctx.globalHooks?.afterHooks ?? []) {
      const l = await hook.handler?.(action, ctx);
      l && logs.push(String(l));
      await wait(gap);
    }

    const queue = $action.get();
    if (queue.length > 0) {
      await walk(ctx);
    }
  } else {
    throw new WalkerError({
      message: WALKER_MISTAKE_MSG,
      log: "Flow not found for action.flowCommand: " + action.flowCommand,
      retry: true,
    });
  }
}
