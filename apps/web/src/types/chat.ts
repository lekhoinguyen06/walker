export type Message = {
  id: number;
  role: 'user' | 'assistant';
  content: string;
};

export type Log = {
  id: number;
  
}

export type ChatMode = 'dev' | 'chat';