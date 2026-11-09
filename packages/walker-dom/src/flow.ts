import type { ActionType, ContextType } from "walker-shared";
import { wait } from "./utils";

export async function executeFlow(
  action: ActionType,
  ctx: ContextType,
  logs: string[],
): Promise<void> {
  const flow = ctx.flows.find((flow) => flow.command === action.flowCommand);
  console.log("[W][D]: Flow found for action.flowCommand: ", flow);
  if (flow) {
    const gap = ctx.gapTimeMs ?? 100;
    await ctx.globalHooks?.beforeHooks?.forEach(async (hook) => {
      hook.handler?.(action, ctx).then((l) => {
        l && logs.push(String(l));
      });
      await wait(gap);
    });
    await wait(gap);
    await flow.beforeHooks?.forEach(async (hook) => {
      hook.handler?.(action, ctx).then((l) => {
        l && logs.push(String(l));
      });
      await wait(gap);
    });
    await wait(1000);
    await flow.handler?.(action, ctx).then((l) => {
      l && logs.push(String(l));
    });
    await wait(gap);
    await flow.afterHooks?.forEach(async (hook) => {
      hook.handler?.(action, ctx).then((l) => {
        l && logs.push(String(l));
      });
      await wait(gap);
    });
    await wait(gap);
    await ctx.globalHooks?.afterHooks?.forEach(async (hook) => {
      hook.handler?.(action, ctx).then((l) => {
        l && logs.push(String(l));
      });
      await wait(gap);
    });
  } else {
    logs.push(
      "ERROR: No flow found for action.flowCommand: " + action.flowCommand,
    );
  }
}
