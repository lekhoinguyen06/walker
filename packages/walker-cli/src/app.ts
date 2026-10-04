import { Hono } from "hono";
import { pushLog } from "./store";
import { logger } from "hono/logger";
import { walker } from "./server";

const app = new Hono();

export const customLogger = (message: string, ...rest: string[]) => {
  pushLog(message);
};

app.use(logger(customLogger));

app.all("/api/walker/*", (c) => walker.handler(c.req.raw));

app.get("/", (c) => {
  return c.text("Hello Bun!");
});

export default app;
