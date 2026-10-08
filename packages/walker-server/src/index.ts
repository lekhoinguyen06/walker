import { AutoRouter, withContent, type IRequestStrict } from "itty-router";
import { handler } from "./handler";
import type { MessageResponseDTO } from "./shared/dto/res.dto";

const router = AutoRouter();

router.get("/api/walker/", () => {
  return "Hello Walkers!";
});

router.get("/api/walker/health", () => {
  return {
    status: 200,
    message: `Hello, Walkers!`,
  } satisfies MessageResponseDTO;
});

router.post("/api/walker/walk", withContent, handler.walk);
router.get("/api/walker/specs", handler.specs);
router.get("/api/walker/docs", handler.docs);

export type WalkerServerType = {
  handler: typeof router.fetch;
};

export const walker: WalkerServerType = {
  handler: router.fetch,
};
