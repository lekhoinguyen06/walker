import { MessageRoleType, TypeOfMessageType } from "./message.const";

// export const messages = p.pgTable("messages", {
//   id: p.uuid().defaultRandom().primaryKey(),
//   sessionId: p.uuid().notNull(),
//   role: rolesEnum().notNull(),
//   type: msgTypesEnum().notNull(),
  
//   // Data
//   content: p.text().notNull(),
//   contentJson: p.json(),
//   usage: p.jsonb(),

//   // Metadata
//   deleted: p.boolean().default(false).notNull(),

//   // Timestamps
//   createdAt: p.timestamp().defaultNow().notNull(),
//   updatedAt: p.timestamp().defaultNow().notNull(),
//   deletedAt: p.timestamp()
// });

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
  deletedAt: Date | null;
}