import type { ActionType, ContextType, HistoryItemType } from "walker-shared";
import { executeFlow } from "./flow";
import { mapper } from "./map";
import { $action } from "./stores";
import { wait } from "./utils";

export async function walk(ctx: ContextType): Promise<void> {
  let logs: string[] = [];

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

    // try {
    //   await executeFlow(action, ctx, logs);
    // } catch (error) {
    //   await walk(ctx)
    // }

    await executeFlow({
      action,
      ctx,
      logs,
      map,
    });
  } else {
    action = queue.shift()!;
    $action.set(queue);
    await executeFlow({
      action,
      ctx,
      logs,
      map,
    });
  }
}
