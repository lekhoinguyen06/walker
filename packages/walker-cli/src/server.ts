import { Hono } from "hono";
import { logger } from "hono/logger";
import { createWalker } from "walker-server";
import { cors } from "hono/cors";
import { pushLog } from "./stores/log.store";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const or = createOpenRouter({
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});

const ai = or.chat("openai/gpt-oss-120b", {
  provider: {
    only: ["groq"],
  },
});

const walker = createWalker({ ai });

const app = new Hono();

export const customLogger = (message: string, ...rest: string[]) => {
  pushLog(message);
};

const combine = (...parts: RegExp[]) =>
  new RegExp(parts.map((p) => p.source).join(""));

const localhostOrigin = combine(
  // starts with 'http:' or 'https:'
  /^https?:\/\//,
  // host is 'localhost' or '127.0.0.1'
  /(localhost|127\.0\.0\.1)/,
  // any port (any number)
  /(:\d+)?/,
  // nothing may follow
  /$/,
);

const isLocalOrigin = (origin: string) => localhostOrigin.test(origin);

app.use(
  "/api/walker/*",
  cors({ origin: (origin) => (isLocalOrigin(origin) ? origin : null) }),
);

app.use(logger(customLogger));

app.all("/api/walker/*", (c) => walker.handler(c.req.raw));

app.get("/", (c) => {
  return c.text("Hello Bun!");
});

export default app;
