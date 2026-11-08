import type { Action, Flow, Context } from "./type";

// Helpers
export async function executeFlow<F extends string>(
  action: Action<F>,
  ctx: Context<F>,
): Promise<void> {
  const flow = ctx.flows.find((flow) => flow.command === action.flowCommand);
  if (flow) {
    await ctx.globalHooks?.beforeHooks?.forEach((hook) =>
      hook.handler?.(action, ctx),
    );
    await flow.beforeHooks?.forEach((hook) => hook.handler?.(action, ctx));
    await flow.handler?.(action, ctx);
    await flow.afterHooks?.forEach((hook) => hook.handler?.(action, ctx));
    await ctx.globalHooks?.afterHooks?.forEach((hook) =>
      hook.handler?.(action, ctx),
    );
  } else {
    console.warn(`No flow found for command: ${action.flowCommand}`);
  }
}
