import { Hono } from "hono";
import { logger } from "hono/logger";
import { createWalker } from "walker-server";
import { cors } from "hono/cors";
import { pushLog } from "./stores/log.store";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { createAmazonBedrock } from "@ai-sdk/amazon-bedrock";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { getProviderConfig, getSelectedProvider } from "./stores/config.store";

async function getAI() {
  const selectedProvider = await getSelectedProvider();
  if (!selectedProvider.providerKey || !selectedProvider.apiKey) {
    throw new Error("No provider selected or API key missing");
  }
  const provider = getProviderConfig(selectedProvider.providerKey);
  if (!provider.modelId) {
    return null;
  }

  switch (selectedProvider.providerKey) {
    case "openrouter": {
      const or = createOpenRouter({
        apiKey: selectedProvider.apiKey,
      });

      const ai = or.chat(provider.modelId, {
        provider: {
          sort: "latency",
        },
      });
      return ai;
    }
    case "bedrock": {
      const br = createAmazonBedrock({
        apiKey: selectedProvider.apiKey,
        region: provider.region || "us-east-1",
      });

      const ai = br(provider.modelId);
      return ai;
    }
    case "openai-compatible": {
      const oai = createOpenAICompatible({
        name: provider.providerName,
        apiKey: selectedProvider.apiKey,
        baseURL: provider.baseURL,
        includeUsage: true,
      });

      const ai = oai(provider.modelId);
      return ai;
    }
  }
}

export const customLogger = (message: string, ...rest: string[]) => {
  pushLog(message);
};

export async function startServer() {
  const ai = await getAI();

  const walker = createWalker({ ai: ai ?? undefined });

  const app = new Hono();

  const combine = (...parts: RegExp[]) =>
    new RegExp(parts.map((p) => p.source).join(""));

  const localhostOrigin = combine(
    // starts with 'http:' or 'https:'
    /^https?:\/\//,
    // host is 'localhost' or '127.0.0.1'
    /(localhost|127\.0\.0\.1)/,
    // any port (any number)
    /(:\d+)?/,
    // nothing may follow
    /$/,
  );

  const isLocalOrigin = (origin: string) => localhostOrigin.test(origin);

  app.use(
    "/api/walker/*",
    cors({ origin: (origin) => (isLocalOrigin(origin) ? origin : null) }),
  );

  app.use(logger(customLogger));

  app.all("/api/walker/*", (c) => walker && walker.handler(c.req.raw));

  app.get("/", (c) => {
    return c.text("Hello Bun!");
  });

  return app;
}
