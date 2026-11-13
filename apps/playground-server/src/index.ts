import { Hono } from "hono";
import { env } from "cloudflare:workers";
import { createWalker } from "walker-server";
import { createAI } from "agents/models/ai-sdk";
import { cors } from "hono/cors";
import { rateLimiter } from "hono-rate-limiter";

const AI_MODEL = "openai/gpt-6-luna";

type Env = {
  PLAYGROUND_SERVER_RATE_LIMITER: RateLimit;
};

const app = new Hono<{ Bindings: Env }>();

app.use(
  "/api/walker/*",
  cors({
    origin: ["https://react.walker.vstaffs.com"],
  }),
);

app.use(
  rateLimiter<{ Bindings: Env }>({
    binding: (c) => c.env.PLAYGROUND_SERVER_RATE_LIMITER,
    keyGenerator: (c) => c.req.header("cf-connecting-ip") ?? "",
  }),
);

app.get("/", (c) => {
  return c.text(`Hello Walkers! This is ${AI_MODEL} serving.`);
});

app.all("/api/walker/*", (c) => {
  const workersai = createAI({ binding: env.AI });
  const ai = workersai(AI_MODEL);
  const walker = createWalker({ ai });

  return walker.handler(c.req.raw);
});

export default app;
