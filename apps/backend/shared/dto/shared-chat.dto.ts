export interface SessionDto {
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
  expireAt?: Date | null;
}

export interface MessageDto {
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

export interface SessionWithMessagesDto extends SessionDto {
  messages: MessageDto[];
}