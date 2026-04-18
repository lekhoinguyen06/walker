import { SQLDatabase } from "encore.dev/storage/sqldb";
import { drizzle } from "drizzle-orm/node-postgres";
// import { apiKeys } from "./schema";

// Create SQLDatabase instance with migrations configuration
const DB = new SQLDatabase("auth", {
  migrations: {
    path: "migrations",
    source: "drizzle",
  },
});

const db = drizzle(DB.connectionString);

export { db };
