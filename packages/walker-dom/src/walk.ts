import type { ActionType, ContextType, HistoryItemType } from "walker-shared";
import { executeFlow } from "./flow";
import { mapper } from "./map";
import {
  $action,
  $history,
  $user,
  getUserPrompt,
  pushLog,
  recordHistory,
} from "./stores";
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
      // No actions in queue, request action from server
      if (!ctx.baseUrl) {
        throw new WalkerError({
          message: "Walker baseUrl is not set. Please contact the developer.",
          retry: false,
        });
      }
      if (!$user.get()?.prompt) {
        throw new WalkerError({
          retry: false,
          message: "Please provide input.",
        });
      }

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
          userPrompt: getUserPrompt(),
        },
      });

      if (result.error instanceof Error) {
        throw new WalkerError({
          retry: true,
          message: `Something went wrong.`,
        });
      }

      if (!result.data?.action) {
        throw new WalkerError({
          retry: true,
          message: "No action received from server.",
        });
      }

      console.log("[W][D] Received action from server: ", result.data.action);

      recordHistory({
        action: result.data.action,
        map,
        ctx,
      });

      await executeFlow({
        action: result.data.action,
        ctx,
        logs,
        map,
      });
    } else {
      // Actions in queue
      action = queue.shift()!;
      $action.set(queue);

      recordHistory({
        action,
        map,
        ctx,
      });

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
      error.log && pushLog(error.log);

      const maxRetryCount = ctx.maxRetryCount ?? 3;

      // Toast error message to user
      maxRetryCount > 0 &&
        (await executeFlow({
          action: {
            flowCommand: "error",
            message:
              error.message +
              (error.retry
                ? ` Retrying (${maxRetryCount} attempts left).`
                : ""),
            itemId: "",
            body: {},
          },
          ctx,
          logs,
          map,
        }));

      if (error.retry && maxRetryCount > 0) {
        // Retry
        await wait(1000);
        await walk({
          ...ctx,
          maxRetryCount: maxRetryCount - 1,
        });
      }
    } else {
      throw error;
    }
  }
}
