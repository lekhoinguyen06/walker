import type { ActionType, ContextType, HistoryItemType } from "walker-shared";
import { executeFlow } from "./flow";
import { mapper } from "./map";
import { $action } from "./store";

export async function walk(ctx: ContextType): Promise<HistoryItemType> {
  let logs: string[] = [];

  const actionsInQueue = $action.get();

  // Map
  const map = mapper();

  // Request
  let action: ActionType;
  if (actionsInQueue.length > 0) {
    action = actionsInQueue.shift()!;
  } else {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    action = {
      itemId: "",
      flowCommand: "none",
      agentMessage: "Hello from walker! What would you like to do?",
      userMessage: "Hello from user!",
      body: {},
    };
  }

  console.log("[W][D]: Next Action: ", action);

  // Validate
  // idsUnique(map);
  // actionItemIdExist(action, map);

  // Execute
  await executeFlow(action, ctx, logs);

  return {
    action,
    map,
    logs,
    timestamp: new Date(),
  };
}
