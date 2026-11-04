import { Hono } from "hono";
import { env } from "cloudflare:workers";
import { createWalker } from "walker-server";
import { createAI } from "agents/models/ai-sdk";
import { cors } from "hono/cors";
import { rateLimiter } from "hono-rate-limiter";

const app = new Hono();

app.use(
  "/api/walker/*",
  cors({
    origin: ["https://react.walker.vstaffs.com/"],
  }),
);

app.use(
  // Limit per IP to 100 requests per hour
  rateLimiter({
    windowMs: 60 * 60 * 1000,
    limit: 100,
    keyGenerator: (c) => c.req.header("x-forwarded-for") ?? "", // Use IP address as key
  }),
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.all("/api/walker/*", (c) => {
  const workersai = createAI({ binding: env.AI });
  const ai = workersai("@cf/openai/gpt-oss-120b");
  const walker = createWalker({ ai });

  return walker.handler(c.req.raw);
});

export default app;
