import type { ActionType, ContextType, HistoryItemType } from "walker-shared";
import { executeFlow } from "./flow";
import { mapper } from "./map";
import { $action } from "./store";
import { wait } from "./utils";

export async function walk(ctx: ContextType): Promise<HistoryItemType> {
  let logs: string[] = [];

  const actionsInQueue = $action.get();

  // Map
  const map = mapper();

  // Request
  let queue = $action.get();
  let action: ActionType;

  if (queue.length === 0) {
    await wait(1000);
    action = {
      itemId: "",
      flowCommand: "none",
      agentMessage: "Hello from walker! What would you like to do?",
      userMessage: "Hello from user!",
      body: {},
    };
    await executeFlow(action, ctx, logs);
  } else {
    action = queue[0]!;
    queue = queue.slice(1);
    $action.set(queue);
    await executeFlow(action, { ...ctx, isLooping: queue.length > 0 }, logs);

    while (queue.length > 0) {
      action = queue[0]!;
      queue = queue.slice(1);
      $action.set(queue);
      await executeFlow(action, { ...ctx, isLooping: queue.length > 0 }, logs);
    }
  }

  return {
    action,
    map,
    logs,
    timestamp: new Date(),
  };
}
