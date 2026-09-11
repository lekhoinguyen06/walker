import { useRuntime } from "@/RuntimeProvider";
import { useChat, useObject } from "@ai-sdk/react";
import { ActionSchema } from "walker-core";
import { DefaultChatTransport } from "ai";
import { toast } from "@/components/ui/toast";
import { useMediaQuery } from "usehooks-ts";
import { usePanelToast } from "./Panel";

export function useConciergeChat() {
  return useChat({
    // messages: initialMessages,
    transport: new DefaultChatTransport({
      api: `${process.env.VITE_CHAT_API_URL}/chat`,
      prepareSendMessagesRequest: ({ messages }) => {
        const msgs = messages.map((message) => ({
          role: message.role,
          content: message.parts
            .map((part) => (part as { text: string }).text)
            .join("\n"),
        }));
        return {
          body: {
            messages: msgs,
          },
        };
      },
    }),
    onError: (error) => {
      toast.add({
        title: "Error when chatting",
        description: error.message,
        type: "error",
      });
    },
  });
}

export function useConciergeWalk({
  noWalk = false,
}: { noWalk?: boolean } = {}) {
  const { runtime, walk, isWalking, actionsInQueueCount } = useRuntime();
  const query = useObject({
    api: `${process.env.VITE_WALK_API_URL}/walk`,
    schema: runtime.getJoinedFlowsSchema(),
    onFinish: async (result) => {
      runtime.addActions([ActionSchema.parse(result.object)]);
      if (!noWalk) {
        walk();
      }
    },
    onError: (error) => {
      toast.add({
        title: "Error when walking",
        description: error.message,
        type: "error",
      });
    },
  });
  return {
    runtime,
    ...query,
    walk,
    isWalking,
    actionsInQueueCount,
  };
}

export type UseWalkProps = {
  url: string;
  noWalk?: boolean;
};

export function useWalk({ url, noWalk = false }: UseWalkProps) {
  const runtime = useRuntime();
  const { toast, pushToast } = usePanelToast();
  const logger = runtime.runtime.getLogger();
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
      logger.error(error);
    },
  });
  return {
    ...query,
    ...runtime,
  };
}

export function useScreenSize() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return { isMobile, isTablet, isDesktop };
}
