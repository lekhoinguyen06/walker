// export const execution = p.pgTable("execution", {
//   id: p.uuid().defaultRandom().primaryKey(),
//   sessionId: p.uuid().notNull(),
//   purpose: p.text().notNull(),
//   status: executionStatusEnum().notNull().default("pending"),

import { CommandDto } from "../command";
import type { Action } from "@repo/core";

//     createdAt: p.timestamp().defaultNow().notNull(),
//     updatedAt: p.timestamp().defaultNow().notNull(),
//     completedAt: p.timestamp(),
//     deletedAt: p.timestamp(),
//     deleted: p.boolean().default(false).notNull(),
// });

export interface ExecutionDto<T = unknown | Action> {
    id: string;
    sessionId: string;
    purpose: string;
    status: string;
    commands: CommandDto<T>[];

    createdAt: Date;
    updatedAt: Date;
    completedAt: Date | null;
    deletedAt: Date | null;
    deleted: boolean;
}