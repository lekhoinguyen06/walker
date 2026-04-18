// auth/routes.ts
import { api } from "encore.dev/api";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth";

// Expose all Better Auth routes (sign-in, sign-up, OAuth callbacks, etc.)
// under /auth/*. Encore's api.raw() gives us Node.js req/res types,
// and toNodeHandler bridges those to Better Auth's handler.
export const authRoutes = api.raw(
  { expose: true, path: "/auth/*path", method: "*" },
  toNodeHandler(auth)
);
