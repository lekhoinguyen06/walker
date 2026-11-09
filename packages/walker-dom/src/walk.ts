import type { ActionType, HistoryItemType } from "walker-shared";
import { executeFlow } from "./flow";
import { mapper } from "./map";
import { $action } from "./store";
import type { ContextType } from "./type";
import { actionItemIdExist, idsUnique } from "./validators";

export async function walk(ctx: ContextType): Promise<HistoryItemType> {
  let logs: string[] = [];

  const actionsInQueue = $action.get();

  // Map
  const map = mapper();

  // Request
  let action: ActionType;
  const historyWindowSize = ctx.historyWindowSize ?? 3;
  if (actionsInQueue.length > historyWindowSize) {
    action = actionsInQueue.shift()!;
  } else {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    action = {
      itemId: "app_item1",
      flowCommand: "click",
      agentMessage: "Hello from walker!",
      userMessage: "Hello from user!",
      body: {},
    };
  }

  // Validate
  idsUnique(map);
  actionItemIdExist(action, map);

  // Execute
  executeFlow(action, ctx, logs);

  return {
    action,
    map,
    logs,
    timestamp: new Date(),
  };
}
