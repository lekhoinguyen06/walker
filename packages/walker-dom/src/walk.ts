import { executeFlow } from "./flow";
import { mapper } from "./map";
import type { Action, Context, HistoryItem } from "./type";
import { actionItemIdExist, idsUnique } from "./validators";

export async function walk<F extends string>(
  ctx: Context<F>,
): Promise<HistoryItem<F>> {
  let logs: string[] = [];

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

  return {
    action,
    map,
    logs,
    timestamp: Date.now(),
  };
}
