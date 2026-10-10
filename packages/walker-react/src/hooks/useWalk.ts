import { useRuntime } from "./useRuntime";
import { usePanelToast } from "./usePanelToast";
import { useObject } from "@ai-sdk/react";
import { ActionSchema } from "walker-core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useWalkerInput } from "./useWalkerInput";
import { postApiWalkerWalk } from "walker-client";
import { createClient } from "walker-client/client";
import { useMemo } from "react";

export type UseWalkProps = {
  url: string;
  noWalk?: boolean;
};

export function useWalk({ url, noWalk = false }: UseWalkProps) {
  const walkerClient = useMemo(() => createClient({ baseUrl: url }), [url]);
  const { input } = useWalkerInput();
  const { runtime, walk } = useRuntime();
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
      console.log("useWalk onSuccess", data);
      if (!data?.action) return;
      runtime.addActions([ActionSchema.parse(data.action)]);
      if (!noWalk) walk();
    },
    onError: (error) => pushToast({ type: "error", message: error.message }),
  });

  return { ...mutation };
}
