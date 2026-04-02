import { ChatMode, Message } from '@/types/chat';
import { create } from 'zustand';

type ChatState = {
  mode: ChatMode;
  messages: Message[];
  setMode: (mode: ChatMode) => void;
  setMessages: (msgs: Message[]) => void;
  addMessage: (msg: Message) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  mode: 'chat',
  messages: [],
  setMode: (mode) => set({ mode }),
  setMessages: (msgs) => set({ messages: msgs }),
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
}));
