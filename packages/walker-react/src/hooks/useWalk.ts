import { useRuntime } from "./useRuntime";
import { usePanelToast } from "./usePanelToast";
import { useObject } from "@ai-sdk/react";
import { ActionSchema } from "walker-core";

export type UseWalkProps = {
  url: string;
  noWalk?: boolean;
};

export function useWalk({ url, noWalk = false }: UseWalkProps) {
  const runtime = useRuntime();
  const { pushToast } = usePanelToast();
  const query = useObject({
    api: url + "/walk",
    schema: ActionSchema.loose(),
    onFinish: async (result) => {
      runtime.runtime.addActions([ActionSchema.parse(result.object)]);
      if (!noWalk) {
        runtime.walk();
      }
    },
    onError: (error) => {
      pushToast({
        type: "error",
        message: error.message,
      });
    },
  });
  return {
    ...query,
    ...runtime,
  };
}
