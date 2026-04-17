import * as p from "drizzle-orm/pg-core";

export const apiKeys = p.pgTable("api_keys", {
  id: p.serial().primaryKey(),
  name: p.text().notNull(),
  key: p.text().unique().notNull(),

  // Metadata fields
  deleted: p.boolean().default(false).notNull(),
  createdAt: p.timestamp().defaultNow().notNull(),
  expireAt: p.timestamp().notNull(),

  // Relational fields
  createdById: p.integer().notNull(),
  deletedById: p.integer(),
});
