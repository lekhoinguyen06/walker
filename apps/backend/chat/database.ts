import { SQLDatabase } from "encore.dev/storage/sqldb";
import { drizzle } from "drizzle-orm/node-postgres"
import * as schema from "./schema";

// Define a database named 'encore_drizzle_test', using the database migrations
// in the "./migrations" folder. Encore automatically provisions,
// migrates, and connects to the database.
const DB = new SQLDatabase('chats', {
  migrations: {
    path: "./migrations",
    source: "drizzle",
  },
});

const db = drizzle(DB.connectionString, { schema });

export { db };
