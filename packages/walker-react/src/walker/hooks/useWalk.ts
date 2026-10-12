import { useRuntime } from "./useRuntime";
import { usePanelToast } from "./usePanelToast";
import { useMutation } from "@tanstack/react-query";
import { useWalkerInput } from "./useWalkerInput";
import { postApiWalkerWalk } from "walker-client";
import { createClient } from "walker-client/client";
import { useEffect, useMemo, useRef } from "react";
import { ActionSchema } from "walker-core";

export type UseWalkProps = {
  url: string;
  noWalk?: boolean;
};

export function useWalk({ url, noWalk = false }: UseWalkProps) {
  const walkerClient = useMemo(() => createClient({ baseUrl: url }), [url]);
  const { input } = useWalkerInput();
  const { runtime, walk, walkAsync, config } = useRuntime();
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
        console.log("Running walker...");
        const { data } = await mutation.mutateAsync();
        if (!data?.action) break;

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

  useEffect(
    () => () => {
      runningRef.current = false;
    },
    [],
  );

  return {
    ...mutation,
    start,
    stop: () => (runningRef.current = false),
    isLooping: runningRef.current,
  };
}
