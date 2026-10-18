import {
  AutoRouter,
  StatusError,
  withContent,
  type IRequestStrict,
} from "itty-router";
import { handler } from "./handler";
import type {
  ErrorResponseDTO,
  MessageResponseDTO,
} from "./shared/dto/res.dto";
import { generateText, Output, type LanguageModel } from "ai";
import { withAI } from "./middlewares/ai.middleware";
import z from "zod";

const router = AutoRouter();

type WalkerServerType = {
  handler: typeof router.fetch;
};

type WalkerServerProps = {
  ai?: LanguageModel;
};

export function createWalker(props: WalkerServerProps): WalkerServerType {
  const ai = props.ai;

  router.get("/api/walker/", () => {
    return "Hello Walkers!";
  });

  ai &&
    router.get("/api/walker/health", withAI(ai), async (req) => {
      try {
        const healthAgent = await generateText({
          model: req.ai,
          output: Output.object({
            schema: z.object({
              quote: z.string(),
            }),
          }),
          prompt: "Return a random positive quote.",
          maxOutputTokens: 1000,
          reasoning: "low",
          toolChoice: "none",
          temperature: 0.8,
        });

        return {
          status: 200,
          message: `Hello, Walkers! Here's a random positive quote for you: "${healthAgent.output.quote}"`,
        } satisfies MessageResponseDTO;
      } catch (error) {
        throw new StatusError(500, {
          status: 500,
          message: "Internal server error",
          error: (error as Error).message,
        } satisfies ErrorResponseDTO);
      }
    });

  ai && router.post("/api/walker/walk", withContent, withAI(ai), handler.walk);
  router.get("/api/walker/specs", handler.specs);
  router.get("/api/walker/docs", handler.docs);

  return {
    handler: router.fetch,
  };
}
