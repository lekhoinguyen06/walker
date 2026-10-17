import { create } from "zustand";

type ProviderConfigType = {
  label: string;
  value: string;
  apiKey: string | null;
  modelId: string | null;
  selected: boolean;
};

const supportedProviders = [
  "openrouter",
  "bedrock",
  "openai-compatible",
] as const;

export function getProviderENV(
  provider: SupportedProviderType,
): string | undefined {
  return process.env[`${provider.toUpperCase()}_API_KEY`];
}

function setProviderENV(provider: SupportedProviderType, apiKey: string): void {
  process.env[`${provider.toUpperCase()}_API_KEY`] = apiKey;
}

type SupportedProviderType = (typeof supportedProviders)[number];

const baseProviderConfig: Record<SupportedProviderType, ProviderConfigType> = {
  openrouter: {
    label: "OpenRouter",
    value: "openrouter",
    apiKey: null,
    modelId: null,
    selected: false,
  },
  bedrock: {
    label: "AWS Bedrock",
    value: "bedrock",
    apiKey: null,
    modelId: null,
    selected: false,
  },
  "openai-compatible": {
    label: "OpenAI Compatible",
    value: "openai-compatible",
    apiKey: null,
    modelId: null,
    selected: false,
  },
};

type ConfigStoreType = {
  providers: Record<SupportedProviderType, ProviderConfigType>;
  fetchApiKeys: () => Promise<void>;
  setApiKey: (provider: SupportedProviderType, apiKey: string) => Promise<void>;
  setModelId: (provider: SupportedProviderType, modelId: string) => void;
};

export const useConfigStore = create<ConfigStoreType>((set) => ({
  providers: baseProviderConfig,

  fetchApiKeys: async () => {
    const apiKeys = await Promise.all(
      supportedProviders.map(async (provider) => {
        const key = await Bun.secrets.get({
          service: "walker-cli",
          name: `${provider}-api-key`,
        });
        return { provider, apiKey: key };
      }),
    );

    set((state) => {
      const updatedProviders = { ...state.providers };
      apiKeys.forEach(({ provider, apiKey }) => {
        updatedProviders[provider] = {
          ...updatedProviders[provider],
          apiKey,
        };
      });
      return { providers: updatedProviders };
    });
  },

  setApiKey: async (provider, apiKey) => {
    await Bun.secrets.set({
      service: "walker-cli",
      name: `${provider}-api-key`,
      value: apiKey,
    });

    setProviderENV(provider, apiKey);

    set((state) => ({
      providers: {
        ...state.providers,
        [provider]: {
          ...state.providers[provider],
          apiKey,
        },
      },
    }));
  },

  setModelId: (provider, modelId) =>
    set((state) => ({
      providers: {
        ...state.providers,
        [provider]: {
          ...state.providers[provider],
          modelId,
        },
      },
    })),
}));
