import { usePanelToast } from "./usePanelToast";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { usePanel } from "./usePanel";

export function usePanelChat() {
  const { url } = usePanel();
  const { pushToast } = usePanelToast();
  return useChat({
    transport: new DefaultChatTransport({
      api: `${url}/api/walker/chat`,
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
      pushToast({
        type: "error",
        message: error.message,
      });
    },
  });
}
