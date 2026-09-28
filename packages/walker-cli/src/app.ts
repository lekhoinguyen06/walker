import { Hono } from "hono";
import { pushLog } from "./store";

const app = new Hono();
app.get("/", (c) => {
  pushLog("Hello Bun!");
  return c.text("Hello Bun!");
});

export default app;
