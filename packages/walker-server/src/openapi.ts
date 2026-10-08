import { createDocument } from "zod-openapi";
import {
  MessageResponseSchema,
  type MessageResponseDTO,
} from "./shared/dto/res.dto";
import {
  WalkRequestBodySchema,
  WalkResponseBodySchema,
  type WalkRequestBodyDTO,
  type WalkResponseBodyDTO,
} from "./routes/walk/walk.dto";

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
                schema: MessageResponseSchema,
                example: {
                  status: 200,
                  message: "Hello, Walkers!",
                } as MessageResponseDTO,
              },
            },
          },
        },
      },
    },
    "/api/walker/walk": {
      post: {
        requestBody: {
          content: {
            "application/json": {
              schema: WalkRequestBodySchema,
              // TODO: add an example from mock
              example: {},
            },
          },
        },
        responses: {
          200: {
            description: "200 OK",
            content: {
              "application/json": {
                schema: WalkResponseBodySchema,
                example: {
                  action: {
                    flow: "click",
                    message: "Clicking the start button to begin the tour.",
                    targetId: "button-1",
                    prompt: "Let's go, I am new here. Show me around.",
                    end: false,
                  },
                  metadata: {
                    timestamp: new Date(),
                    usage: {
                      inputTokens: 1005,
                      inputTokenDetails: {
                        noCacheTokens: 1005,
                        cacheReadTokens: 0,
                        cacheWriteTokens: 0,
                      },
                      outputTokens: 293,
                      outputTokenDetails: {
                        textTokens: 54,
                        reasoningTokens: 239,
                      },
                      totalTokens: 1298,
                    },
                  },
                } satisfies WalkResponseBodyDTO,
              },
            },
          },
        },
      },
    },
  },
});
