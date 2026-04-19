import * as p from "drizzle-orm/pg-core";

export const sessions = p.pgTable("sessions", {
  id: p.serial().primaryKey(),
  userId: p.integer().notNull(),
  sessionData: p.jsonb().notNull(),
});
