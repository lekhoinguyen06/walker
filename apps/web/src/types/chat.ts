export type Message = {
  id: number;
  role: 'user' | 'assistant';
  content: string;
};

export type ChatMode = 'dev' | 'chat';