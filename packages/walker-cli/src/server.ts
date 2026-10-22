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

  switch (selectedProvider.providerKey) {
    case "openrouter": {
      const provider = getProviderConfig("openrouter");

      if (!provider.modelId) {
        throw new Error(
          "Missing required coonfiguration for OpenRouter provider",
        );
      }

      const or = createOpenRouter({
        apiKey: selectedProvider.apiKey,
      });

      return or.chat(provider.modelId, {
        provider: {
          sort: "latency",
        },
      });
    }

    case "bedrock": {
      const provider = getProviderConfig("bedrock");

      if (!provider.modelId) {
        throw new Error(
          "Missing required coonfiguration for AWS Bedrock provider",
        );
      }

      const br = createAmazonBedrock({
        apiKey: selectedProvider.apiKey,
        region: provider.region ?? "us-east-1",
      });

      return br(provider.modelId);
    }

    case "openai-compatible": {
      const provider = getProviderConfig("openai-compatible");

      if (!provider.modelId || !provider.providerName || !provider.baseURL) {
        throw new Error(
          "Missing required coonfiguration for OpenAI-compatible provider",
        );
      }

      const oai = createOpenAICompatible({
        name: provider.providerName,
        apiKey: selectedProvider.apiKey,
        baseURL: provider.baseURL,
        includeUsage: true,
      });

      return oai(provider.modelId);
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

  app.all("/api/walker/*", (c) => walker.handler(c.req.raw));

  app.get("/", (c) => {
    return c.text("Hello Bun!");
  });

  return app;
}
