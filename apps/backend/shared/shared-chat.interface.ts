export interface Session {
  id: string;
  userId: string;
  title: string;

  // Metadata
  deleted: boolean;
  retention: number;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface Message {
  id: string;
  sessionId: string;
  role: "user" | "assistant" | "system" | null;
  content: any;

  // Metadata
  deleted: boolean;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface SessionWithMessages extends Session {
  messages: Message[];
}