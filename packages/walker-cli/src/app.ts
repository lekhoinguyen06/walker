import { Hono } from "hono";
import { pushLog } from "./store";
import { logger } from "hono/logger";

const app = new Hono();

export const customLogger = (message: string, ...rest: string[]) => {
  pushLog(message);
};

app.use(logger(customLogger));

app.get("/", (c) => {
  return c.text("Hello Bun!");
});

export default app;
