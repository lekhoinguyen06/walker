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
  deletedAt?: Date;
}

export interface Message {
  id: string;
  sessionId: string;
  role: "user" | "assistant" | "system";
  content: any;

  // Metadata
  deleted: boolean;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface SessionWithMessages extends Session {
  messages: Message[];
}