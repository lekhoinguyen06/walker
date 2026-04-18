import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./database";
import { secret } from "encore.dev/config";
import { apiKey } from "@better-auth/api-key";

const authSecret = secret("AuthSecret");

export const auth = betterAuth({
  secret: authSecret(),
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  baseURL: "http://localhost:4000",
  trustedOrigins: ["http://localhost:4000", "http://localhost:3000"],
  plugins: [
    apiKey()
  ]
});