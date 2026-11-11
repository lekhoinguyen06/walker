import type { ActionType, ContextType, HistoryItemType } from "walker-shared";
import { executeFlow } from "./flow";
import { mapper } from "./map";
import { $action, $history, recordHistory } from "./stores";
import { wait } from "./utils";
import { WalkerError } from "./error";

export async function walk(ctx: ContextType): Promise<void> {
  console.log("[W][D] Starting walk with context: ", ctx);

  let logs: string[] = [];

  // Map
  const map = mapper();

  // Request
  let queue = $action.get();
  let action: ActionType | null = null;

  try {
    if (queue.length === 0) {
      await wait(1000);
      action = {
        itemId: "",
        flowCommand: "none",
        message: "Hello from walker! What would you like to do?",
        body: {},
      };
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
  } catch (error) {
    if (error instanceof WalkerError) {
      console.error("[W][D] WalkerError:", error.message);
      logs.push(error.message);
      if (action) {
        recordHistory({
          action,
          map,
          logs,
          ctx,
        });
      }
      const maxRetryCount = ctx.maxRetryCount ?? 3;
      if (maxRetryCount <= 0) {
        await executeFlow({
          action: {
            flowCommand: "error",
            message: "Max retry count reached. Stopping execution.",
            itemId: "",
            body: {},
          },
          ctx,
          logs,
          map,
        });
      }
      console.log("[W][D] Toast an error message");
      await executeFlow({
        action: {
          flowCommand: "error",
          message: "Something went wrong. Retrying...",
          itemId: "",
          body: {},
        },
        ctx,
        logs,
        map,
      });
      await wait(1000);
      await walk({
        ...ctx,
        maxRetryCount,
      });
    } else {
      throw error;
    }
  }
}
