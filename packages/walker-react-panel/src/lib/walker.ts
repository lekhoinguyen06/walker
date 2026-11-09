import { webFlows } from "walker-dom";
import type { FlowWithHooksAndHandlerType, HookType } from "walker-shared";
import type { PanelToastItemType } from "@/components/panel/PanelToast";

export function panelFlowsFactory({
  pushToast,
}: {
  pushToast: (toast: PanelToastItemType) => void;
}): FlowWithHooksAndHandlerType[] {
  return [
    {
      command: "none",
      handler: async (action) => {
        pushToast({
          type: "info",
          message: action.agentMessage,
        });
      },
    },
    ...webFlows,
  ];
}

export function panelMessageHookFactory({
  pushToast,
}: {
  pushToast: (toast: PanelToastItemType) => void;
}): HookType {
  return {
    handler: async (action) => {
      pushToast({
        type: "info",
        message: action.agentMessage,
      });
    },
  };
}
