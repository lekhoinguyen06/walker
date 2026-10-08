import { AutoRouter, withContent, type IRequestStrict } from "itty-router";
import { handler } from "./handler";

const router = AutoRouter();

router.get("/api/walker/", () => {
  return "Hello Walkers!";
});

router.get("/api/walker/health", () => {
  return {
    status: 200,
    message: `Hello, Walkers!`,
  };
});
router.post("/api/walker/walk", withContent, handler.walk);

export type WalkerServerType = {
  handler: typeof router.fetch;
};

export const walker: WalkerServerType = {
  handler: router.fetch,
};
