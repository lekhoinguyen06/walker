import { useRuntime } from "./useRuntime";
import { usePanelToast } from "./usePanelToast";
import { useMutation } from "@tanstack/react-query";
import { useWalkerInput } from "./useWalkerInput";
import { postApiWalkerWalk } from "walker-client";
import { createClient } from "walker-client/client";
import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import { ActionSchema } from "walker-core";
import { useConfig } from "./useConfig";

export type UseWalkProps = {
  noWalk?: boolean;
};

export function useWalk({ noWalk = false }: UseWalkProps) {
  const { config } = useConfig();
  const walkerClient = useMemo(
    () => createClient({ baseUrl: config.url }),
    [config.url],
  );
  const { input } = useWalkerInput();
  const { runtime, walk, walkAsync, isWalking } = useRuntime();
  const { pushToast } = usePanelToast();

  const runningRef = useRef(false);

  const mutation = useMutation({
    mutationFn: () =>
      postApiWalkerWalk({
        client: walkerClient,
        body: {
          flows: runtime.listFlows(),
          history: runtime.listHistory(),
          map: runtime.map(),
          prompt: input,
          skills: [],
        },
      }),
    // onSuccess: ({ data }) => {
    //   if (!data?.action) return;
    //   runtime.addActions([ActionSchema.parse(data.action)]);
    //   if (!noWalk) walk();
    // },
    onError: (error) => pushToast({ type: "error", message: error.message }),
  });

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const start = async () => {
    if (runningRef.current) return;
    runningRef.current = true;
    try {
      while (runningRef.current) {
        if (input.trim() === "") break;
        const { data } = await mutation.mutateAsync();
        if (!data?.action) break;

        if (runningRef.current)
          runtime.addActions([ActionSchema.parse(data.action)]);
        if (!noWalk) await walkAsync();

        if (!config.loop) break;
        if (data.action.end) break;
        // await sleep(1000);
      }
    } catch (error) {
      pushToast({
        type: "error",
        message: "Something went wrong, please try again.",
      });
      console.error(error);
    } finally {
      runningRef.current = false;
    }
  };

  useEffect(() => {
    const lastHistoryItem = runtime.listHistory()[0];
    if (
      config.loop &&
      lastHistoryItem &&
      lastHistoryItem.action.end === false &&
      lastHistoryItem.logs[0]?.message === "EXECUTED_ACTION" &&
      // Only start the loop if the last action was executed less than 5 seconds ago
      lastHistoryItem.logs[0]?.timestamp &&
      Date.now() - lastHistoryItem.logs[0].timestamp < 5000
    ) {
      start();
    }
    return () => {
      runningRef.current = false;
    };
  }, []);

  const isLooping = runningRef.current;
  const isPending = mutation.isPending;
  const actionsInQueueCount = runtime.countActionsInQueued();

  const handleStop = () => {
    runningRef.current = false;
    runtime.clearActions();
    mutation.reset();
    runtime.addActions([
      {
        prompt: "",
        message: "Stopped walker.",
        end: true,
        flow: "none",
        targetId: "",
      },
    ]);
    walk();
  };

  const handleSubmit = () => {
    if (isLooping || isWalking || isPending) {
      handleStop();
      return;
    }
    if (actionsInQueueCount === 0 && !isPending && !isWalking) {
      if (input.trim() === "") {
        pushToast({
          type: "info",
          message: "Input is empty, please instruct Walker.",
        });
        return;
      }
      start();
    } else {
      pushToast({
        type: "info",
        message: "Manual walk",
      });
      walk();
    }
  };

  return {
    ...mutation,
    start,
    handleStop,
    isLooping,
    isPending,
    isWalking,
    handleSubmit,
  };
}

const WalkContext = createContext<ReturnType<typeof useWalk> | null>(null);

export function usePanelWalk() {
  const context = useContext(WalkContext);
  if (!context) {
    throw new Error("usePanelWalk must be used within a WalkProvider");
  }
  return context;
}

export function WalkProvider({ children }: { children: React.ReactNode }) {
  const walk = useWalk({});
  return <WalkContext.Provider value={walk}>{children}</WalkContext.Provider>;
}
