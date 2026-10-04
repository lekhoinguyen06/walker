import { AutoRouter } from "itty-router";

const router = AutoRouter();

router.get("/api/walker/", () => {
  return "Hello Walkers!";
});

router.get("/api/walker/hello/:name", ({ params }) => {
  return `Hello, ${params.name}!`;
});

export type WalkerServerType = {
  handler: typeof router.fetch;
};

export const walker: WalkerServerType = {
  handler: router.fetch,
};
