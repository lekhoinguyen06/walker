import { usePanelToast } from "./usePanelToast";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

export function useWalkerChat() {
  const { pushToast } = usePanelToast();
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
      pushToast({
        type: "error",
        message: error.message,
      });
    },
  });
}
