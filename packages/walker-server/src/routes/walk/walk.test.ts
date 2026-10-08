import { describe, it, expect, beforeEach, beforeAll, afterAll } from "vitest";
import { clickFlow, mockItem, type MapType } from "walker-core";
import type { WalkRequestBodyType } from "./walk.dto";
import z from "zod";
import skill from "../../walker-skill.md?raw";
import { Hono } from "hono";
import { fetcher } from "itty-fetcher";
import { serve, type ServerType } from "@hono/node-server";
import { walker } from "../..";

describe("/walk", () => {
  const server = new Hono();
  server.all("/api/walker/*", (c) => walker.handler(c.req.raw));
  serve(server);
  const api = fetcher("http://localhost:6767/api/walker");

  let http: ServerType;
  beforeAll(() => {
    http = serve({
      port: 6767,
      fetch: server.fetch,
    });
  });

  afterAll(() => {
    http.close();
  });

  it("pass health check", async () => {
    const result = await api.get("/health");
    console.log(result);
    expect(result).toStrictEqual({
      status: 200,
      message: "Hello, Walkers!",
    });
  });

  it("handles a simple map and flow", async () => {
    const map: MapType = {
      "app-1": mockItem({
        id: "app-1",
        type: "app",
        description: "My app",
        refId: null,
        content: false,
        raw: false,
        scope: true,
        state: null,
        children: {
          "button-1": mockItem({
            id: "button-1",
            type: "button",
            description: "My button, click to get started.",
            refId: null,
            content: false,
            raw: false,
            scope: true,
            state: null,
          }),
        },
      }),
    };

    const body: WalkRequestBodyType = {
      history: [],
      flows: [
        {
          command: clickFlow.command,
          description: clickFlow.description,
          schema:
            clickFlow.schema instanceof z.ZodObject
              ? JSON.stringify(clickFlow.schema.toJSONSchema(), null, 2)
              : null,
        },
      ],
      map,
      skills: [skill],
      prompt: "Let's go, I am new here. Show me around.",
    };

    console.log("Request body:", body);
    const result = await api.post("/walk", body);
    console.log(result);

    expect(true).toBe(true);
  });
});
