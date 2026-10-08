import z from "zod";
import { createDocument } from "zod-openapi";

export const openapiDocument = createDocument({
  openapi: "3.1.0",
  info: {
    title: "Walker Server API",
    version: "0.1.0",
  },
  paths: {
    "/api/walker/health": {
      get: {
        responses: {
          200: {
            description: "200 OK",
            content: {
              "application/json": {
                schema: z.string(),
                example: "Hello, Walkers!",
              },
            },
          },
        },
      },
    },
  },
});
