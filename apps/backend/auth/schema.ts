import * as p from "drizzle-orm/pg-core";

export const apiKeys = p.pgTable("api_keys", {
  id: p.serial().primaryKey(),
  name: p.text().notNull(),
  key: p.text().unique().notNull(),
});
