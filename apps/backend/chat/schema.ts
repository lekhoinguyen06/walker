import { relations } from "drizzle-orm";
import * as p from "drizzle-orm/pg-core";
import { AttachmentType, MessageRole, MessageType } from "./message/message.const";
import { SessionRetention } from "./session/session.const";
// Enums
export const msgTypesEnum = p.pgEnum("msg_type", [MessageType.Question, MessageType.Answer, MessageType.Command, MessageType.Explain, MessageType.Other]);
export const attachmentTypesEnum = p.pgEnum("attachment_type", [AttachmentType.File, AttachmentType.Image, AttachmentType.Code, AttachmentType.Table, AttachmentType.Other]);
export const rolesEnum = p.pgEnum("role",[MessageRole.User, MessageRole.Assistant, MessageRole.System]);

// Schemas
export const sessions = p.pgTable("sessions", {
  id: p.uuid().defaultRandom().primaryKey(),
  userId: p.text().notNull(),
  title: p.text().notNull(),

  // Metadata
  deleted: p.boolean().default(false).notNull(),
  retention: p.integer().default(SessionRetention.Month).notNull(),

  // Timestamps
  createdAt: p.timestamp().defaultNow().notNull(),
  updatedAt: p.timestamp().defaultNow().notNull(),
  deletedAt: p.timestamp(),
  expireAt: p.timestamp()
});

export const messages = p.pgTable("messages", {
  id: p.uuid().defaultRandom().primaryKey(),
  sessionId: p.uuid().notNull(),
  role: rolesEnum().notNull(),
  type: msgTypesEnum().notNull(),
  
  // Data
  content: p.text().notNull(),
  contentJson: p.json(),
  usage: p.jsonb(),

  // Metadata
  deleted: p.boolean().default(false).notNull(),

  // Timestamps
  createdAt: p.timestamp().defaultNow().notNull(),
  updatedAt: p.timestamp().defaultNow().notNull(),
  deletedAt: p.timestamp()
});

export const topics = p.pgTable("topics", {
  id: p.uuid().defaultRandom().primaryKey(),
  sessionId: p.uuid().notNull(),

  // Data
  content: p.text().notNull(),

  // Timestamps
  createdAt: p.timestamp().defaultNow().notNull(),
  updatedAt: p.timestamp().defaultNow().notNull(),
});

export const summaries = p.pgTable("summaries", {
  id: p.uuid().defaultRandom().primaryKey(),
  sessionId: p.uuid().notNull(),

  // Range
  fromMsgId: p.uuid().notNull(),
  toMsgId: p.uuid().notNull(),

  // Data
  content: p.text().notNull(),
  contentJson: p.json(),
  usage: p.jsonb(),

  // Timestamps
  createdAt: p.timestamp().defaultNow().notNull(),
  updatedAt: p.timestamp().defaultNow().notNull(),
});

export const toolCalls = p.pgTable("tool_calls", {
  id: p.uuid().defaultRandom().primaryKey(),
  messageId: p.uuid().notNull(),
  tool: p.text().notNull(),
  input: p.json().notNull(),
  output: p.json(),

  // Timestamps
  createdAt: p.timestamp().defaultNow().notNull(),
});

export const attachments = p.pgTable("attachments", {
  id: p.uuid().defaultRandom().primaryKey(),
  messageId: p.uuid().notNull(),
  filename: p.text().notNull(),
  type: attachmentTypesEnum().notNull(),

  // Data
  url: p.text().notNull(),

  // Timestamps
  createdAt: p.timestamp().defaultNow().notNull(),
  updatedAt: p.timestamp().defaultNow().notNull(),
  deletedAt: p.timestamp(),
});

// Relations
export const sessionsRelations = relations(sessions, ({ many }) => ({
  messages: many(messages),
  summaries: many(summaries),
  topics: many(topics),
}))

export const messagesRelations = relations(messages, ({ one }) => ({
  session: one(sessions, {
    fields: [messages.sessionId],
    references: [sessions.id],
  }),
  topics: one(topics, {
    fields: [messages.sessionId],
    references: [topics.sessionId],
  }),
}))

export const summariesRelations = relations(summaries, ({ one }) => ({
  session: one(sessions, {
    fields: [summaries.sessionId],
    references: [sessions.id],
  }),
}))

export const topicsRelations = relations(topics, ({ one, many }) => ({
  session: one(sessions, {
    fields: [topics.sessionId],
    references: [sessions.id],
  }),
  messages: many(messages),
}))

export const toolCallsRelations = relations(toolCalls, ({ one }) => ({
  message: one(messages, {
    fields: [toolCalls.messageId],
    references: [messages.id],
  }),
}))

export const attachmentsRelations = relations(attachments, ({ one }) => ({
  message: one(messages, {
    fields: [attachments.messageId],
    references: [messages.id],
  }),
}))



