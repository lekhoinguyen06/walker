import type { ActionType, ContextType } from "walker-shared";
import { wait } from "./utils";
import { $action } from "./store";

export async function executeFlow(
  action: ActionType,
  ctx: ContextType,
  logs: string[],
): Promise<void> {
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
    await flow.handler?.(action, ctx).then((l) => {
      l && logs.push(String(l));
    });
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
      const nextAction = queue.shift()!;
      $action.set(queue);
      await executeFlow(nextAction, ctx, logs);
    } else {
      // Await for mouse return animation so that styling does not end too soon
      await wait(1000);
    }
  } else {
    logs.push(
      "ERROR: No flow found for action.flowCommand: " + action.flowCommand,
    );
  }
}
