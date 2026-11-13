import type { ActionType, ContextType, HistoryItemType } from "walker-shared";
import { executeFlow } from "./flow";
import { mapper } from "./map";
import { $action, $history, recordHistory } from "./stores";
import { wait } from "./utils";
import { WalkerError } from "./error";
import { postApiWalkerWalk } from "walker-client";
import { createClient } from "walker-client/client";

export async function walk(ctx: ContextType): Promise<void> {
  console.log("[W][D] Starting walk with context: ", ctx);

  let logs: string[] = [];

  // Map
  const map = mapper();

  // Request
  let queue = $action.get();
  let action: ActionType | null = null;
  let histories = $history.get();

  try {
    if (queue.length === 0) {
      console.log(
        `[W][D] Queue is empty, requesting action from server at ${ctx.baseUrl}`,
      );
      const client = createClient({
        baseUrl: ctx.baseUrl,
      });
      const result = await postApiWalkerWalk({
        client,
        body: {
          histories,
          flows: ctx.flows,
          map,
          skills: [],
          userPrompt: ctx.userPrompt,
        },
      });

      if (result.error) {
        throw new WalkerError(
          `Failed to get action from server: ${result.error.message}`,
        );
      }
      if (!result.data?.action) {
        throw new WalkerError("Failed to get action from server, retrying...");
      }

      console.log("[W][D] Received action from server: ", result.data.action);

      await executeFlow({
        action: result.data.action,
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

        return;
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
        maxRetryCount: maxRetryCount - 1,
      });
    } else {
      throw error;
    }
  }
}
