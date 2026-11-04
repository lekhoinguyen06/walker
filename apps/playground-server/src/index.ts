import { Hono } from "hono";
import { walker } from "./walker";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.all("/api/walker/*", (c) => walker.handler(c.req.raw));

export default app;
