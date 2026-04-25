import { relations } from "drizzle-orm";
import * as p from "drizzle-orm/pg-core";

// Schemas
export const sessions = p.pgTable("sessions", {
  id: p.uuid().defaultRandom().primaryKey(),
  userId: p.uuid().notNull(),
  title: p.text().notNull(),

  // Metadata
  deleted: p.boolean().default(false).notNull(),
  retention: p.integer().default(30).notNull(),

  // Timestamps
  createdAt: p.timestamp().defaultNow().notNull(),
  updatedAt: p.timestamp().defaultNow().notNull(),
  deletedAt: p.timestamp(),
});

export const rolesEnum = p.pgEnum("role",["user", "assistant", "system"]);

export const messages = p.pgTable("messages", {
  id: p.uuid().defaultRandom().primaryKey(),
  sessionId: p.uuid().notNull(),
  role: rolesEnum(),
  content: p.json().notNull(),

  // Metadata
  deleted: p.boolean().default(false).notNull(),

  // Timestamps
  createdAt: p.timestamp().defaultNow().notNull(),
  updatedAt: p.timestamp().defaultNow().notNull(),
  deletedAt: p.timestamp()
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
  url: p.text().notNull(),

  // Timestamps
  createdAt: p.timestamp().defaultNow().notNull(),
  updatedAt: p.timestamp().defaultNow().notNull(),
  deletedAt: p.timestamp(),
});

// Relations
export const sessionsRelations = relations(sessions, ({ many }) => ({
  messages: many(messages),
}))

export const messagesRelations = relations(messages, ({ one }) => ({
  session: one(sessions, {
    fields: [messages.sessionId],
    references: [sessions.id],
  }),
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



