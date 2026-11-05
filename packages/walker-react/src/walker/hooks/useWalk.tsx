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
    onSuccess: ({ data }) => {
      if (!data?.action) return;
      runtime.addActions([ActionSchema.parse(data.action)]);
      if (!noWalk) walk();
    },
    onError: (error) => pushToast({ type: "error", message: error.message }),
  });

  const handleSubmit = async () => {
    const actionsInQueue = runtime.listActions();
    if (actionsInQueue.length > 0) {
      pushToast({
        type: "info",
        message: "Manual walk",
      });
      walk();
      return;
    }
    if (!input) {
      pushToast({
        type: "error",
        message: "Input is empty",
      });
      return;
    } else {
      await mutation.mutateAsync();
    }
  };

  return {
    ...mutation,
    isPending: mutation.isPending,
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
