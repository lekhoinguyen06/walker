import {
  inputFlow,
  mouseHook,
  scrollHook,
  clickFlow,
  mouseReturnHook,
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
        command: "none",
        handler: async (action) => {
          pushToast({
            type: "info",
            message: action.agentMessage,
          });
        },
      },
      clickFlow,
      inputFlow,
    ],
    globalHooks: {
      beforeHooks: [
        {
          handler: async (action) => {
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
