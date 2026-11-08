import { executeFlow } from "./flow";
import { mapper } from "./map";
import type { Action, Context } from "./type";
import { actionItemIdExist, idsUnique } from "./validators";

export async function walk<F extends string>(ctx: Context<F>): Promise<void> {
  // Map
  const map = mapper();

  // Request
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const action: Action<F> = {
    itemId: "app_item1",
    flowCommand: "click" as F,
    agentMessage: "Hello from walker!",
    body: {},
  };

  // Validate
  idsUnique(map);
  actionItemIdExist(action, map);

  // Execute
  executeFlow(action, ctx);
}
