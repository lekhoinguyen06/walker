import * as p from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { CommandPayloadType, CommandStatus } from "./command";
import { ExecutionStatus } from "./execution";

export const executionStatusEnum = p.pgEnum("execution_status", [ExecutionStatus.PENDING, ExecutionStatus.RUNNING, ExecutionStatus.COMPLETED, ExecutionStatus.CANCELLED, ExecutionStatus.FAILED]);
export const commandStatusEnum = p.pgEnum("command_status", [CommandStatus.DRAFTING, CommandStatus.EXECUTING, CommandStatus.COMPLETED, CommandStatus.CANCELLED, CommandStatus.FAILED]);
export const commandPayloadTypeEnum = p.pgEnum("command_payload_type", [CommandPayloadType.ACTION, CommandPayloadType.MAP]);

export const execution = p.pgTable("execution", {
  id: p.uuid().defaultRandom().primaryKey(),
  sessionId: p.uuid().notNull(),
  purpose: p.text().notNull(),
  status: executionStatusEnum().notNull().default(ExecutionStatus.PENDING),

    createdAt: p.timestamp().defaultNow().notNull(),
    updatedAt: p.timestamp().defaultNow().notNull(),
    completedAt: p.timestamp(),
    deletedAt: p.timestamp(),
    deleted: p.boolean().default(false).notNull(),
});

export const command = p.pgTable("command", {
  id: p.uuid().defaultRandom().primaryKey(),
  executionId: p.uuid().notNull(),

  payloadType: commandPayloadTypeEnum().notNull(),
  payload: p.jsonb().notNull(),
  status: commandStatusEnum().notNull().default(CommandStatus.DRAFTING),

    createdAt: p.timestamp().defaultNow().notNull(),
    updatedAt: p.timestamp().defaultNow().notNull(),
    completedAt: p.timestamp(),
    deletedAt: p.timestamp(),
    deleted: p.boolean().default(false).notNull(),
});

export const executionRelations = relations(execution, ({ many }) => ({
  commands: many(command),
}));

export const commandRelations = relations(command, ({ one }) => ({
  execution: one(execution, {
    fields: [command.executionId],
    references: [execution.id],
  }),
}));