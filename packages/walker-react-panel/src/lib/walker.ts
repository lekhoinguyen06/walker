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
  userPrompt,
  pushToast,
}: {
  userPrompt: string;
  pushToast: (toast: PanelToastItemType) => void;
}): ContextType {
  return {
    userPrompt,
    flows: [
      {
        command: "error",
        handler: async (action) => {
          pushToast({
            type: "error",
            message: action.systemMessage,
          });
        },
      },
      {
        command: "success",
        handler: async (action) => {
          pushToast({
            type: "success",
            message: action.systemMessage,
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
            if (action.agentMessage === "") {
              return;
            }
            pushToast({
              type: "info",
              message: action.agentMessage,
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
