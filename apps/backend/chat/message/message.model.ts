import { MessageRoleType, TypeOfMessageType } from "./message.const";

export interface MessageDto {
  id: string;
  sessionId: string;
  role: MessageRoleType;
  type: TypeOfMessageType;

  // Data
  content: string;
  contentJson?: any;
  usage?: any;

  // Metadata
  deleted: boolean;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}