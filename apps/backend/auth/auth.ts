import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./database";
import { secret } from "encore.dev/config";
import { apiKey } from "@better-auth/api-key";
import * as schema from "./schema";

const authSecret = secret("AuthSecret");

export const auth = betterAuth({
  secret: authSecret(),
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  baseURL: "http://localhost:4000/auth",
  trustedOrigins: ["http://localhost:4000", "http://localhost:3000"],
  emailAndPassword: {
      enabled: true,
  },
  plugins: [
    apiKey()
  ]
});