import { AutoRouter, withContent, type IRequestStrict } from "itty-router";
import { handler } from "./handler";
import type { MessageResponseDTO } from "./shared/dto/res.dto";
import type { LanguageModel } from "ai";
import { withAI } from "./middlewares/ai.middleware";

const router = AutoRouter();

type WalkerServerType = {
  handler: typeof router.fetch;
};

type WalkerServerProps = {
  ai: LanguageModel;
};

export function createWalker(props: WalkerServerProps): WalkerServerType {
  const ai = props.ai;

  router.get("/api/walker/", () => {
    return "Hello Walkers!";
  });

  router.get("/api/walker/health", () => {
    return {
      status: 200,
      message: `Hello, Walkers!`,
    } satisfies MessageResponseDTO;
  });

  router.post("/api/walker/walk", withContent, withAI(ai), handler.walk);
  router.get("/api/walker/specs", handler.specs);
  router.get("/api/walker/docs", handler.docs);

  return {
    handler: router.fetch,
  };
}
