import { ChatMode, Message } from '@/types/chat';
import { create } from 'zustand';
import { LogItem } from '@repo/walker';

type ChatState = {
  mode: ChatMode;
  logs: LogItem[];
  messages: Message[];
  setMode: (mode: ChatMode) => void;
  addLog: (log: LogItem) => void;
  clearLogs: () => void;
  setMessages: (msgs: Message[]) => void;
  addMessage: (msg: Message) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  mode: 'chat',
  logs: [],
  messages: [],
  setMode: (mode) => set({ mode }),
  addLog: (log) => set((state) => ({ logs: [...state.logs, log] })),
  clearLogs: () => set({ logs: [] }),
  setMessages: (msgs) => set({ messages: msgs }),
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
}));
