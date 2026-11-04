import { Hono } from "hono";
import { env } from "cloudflare:workers";
import { createWalker } from "walker-server";
import { createAI } from "agents/models/ai-sdk";

const app = new Hono();

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
