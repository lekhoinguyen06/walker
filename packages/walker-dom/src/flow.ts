import type { Action, Flow, Context } from "./type";

// Helpers
export async function executeFlow(
  action: Action,
  ctx: Context,
  logs: string[],
): Promise<void> {
  const flow = ctx.flows.find((flow) => flow.command === action.flowCommand);
  if (flow) {
    await ctx.globalHooks?.beforeHooks?.forEach((hook) =>
      hook.handler?.(action, ctx).then((l) => {
        l && logs.push(String(l));
      }),
    );
    await flow.beforeHooks?.forEach((hook) =>
      hook.handler?.(action, ctx).then((l) => {
        l && logs.push(String(l));
      }),
    );
    await flow.handler?.(action, ctx).then((l) => {
      l && logs.push(String(l));
    });
    await flow.afterHooks?.forEach((hook) =>
      hook.handler?.(action, ctx).then((l) => {
        l && logs.push(String(l));
      }),
    );
    await ctx.globalHooks?.afterHooks?.forEach((hook) =>
      hook.handler?.(action, ctx).then((l) => {
        l && logs.push(String(l));
      }),
    );
  } else {
    logs.push(
      "ERROR: No flow found for action.flowCommand: " + action.flowCommand,
    );
  }
}
