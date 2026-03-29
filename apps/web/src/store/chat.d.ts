import { Message } from '@/types/chat';
type ChatState = {
  messages: Message[];
  setMessages: (msgs: Message[]) => void;
  addMessage: (msg: Message) => void;
};
export declare const useChatStore: import('zustand').UseBoundStore<
  import('zustand').StoreApi<ChatState>
>;
export {};
//# sourceMappingURL=chat.d.ts.map
