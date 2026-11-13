import {
  inputFlow,
  mouseHook,
  scrollHook,
  clickFlow,
  mouseReturnHook,
  noneFlow,
} from "walker-dom";
import type { ContextType } from "walker-shared";
import type { PanelToastItemType } from "@/components/panel/PanelToast";

export function panelContextFactory({
  baseUrl,
  pushToast,
}: {
  baseUrl: string;
  pushToast: (toast: PanelToastItemType) => void;
}): ContextType {
  return {
    baseUrl,
    flows: [
      {
        command: "error",
        handler: async (action) => {
          pushToast({
            type: "error",
            message: action.message,
          });
        },
      },
      {
        command: "success",
        handler: async (action) => {
          pushToast({
            type: "success",
            message: action.message,
          });
        },
      },
      clickFlow,
      inputFlow,
      noneFlow,
    ],
    globalHooks: {
      beforeHooks: [
        {
          handler: async (action) => {
            if (
              action.flowCommand === "error" ||
              action.flowCommand === "success" ||
              action.message === ""
            ) {
              return;
            }
            pushToast({
              type: "info",
              message: action.message,
            });
          },
        },
        scrollHook,
        mouseHook,
      ],
      afterHooks: [mouseReturnHook],
    },
  };
}
