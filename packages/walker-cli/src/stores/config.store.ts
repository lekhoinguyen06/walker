import { create } from "zustand";

type ProviderConfigType = {
  label: string;
  value: string;
  apiKey: string | null;
  modelId: string | null;
};

export const supportedProviders = [
  "openrouter",
  "bedrock",
  "openai-compatible",
] as const;

export function getProviderENV(provider: SupportedProviderType): {
  apiKey?: string;
  modelId?: string;
} {
  return {
    apiKey: process.env[`${provider.toUpperCase()}_API_KEY`],
    modelId: process.env[`${provider.toUpperCase()}_MODEL_ID`],
  };
}

function setProviderENV({
  provider,
  modelId,
  apiKey,
}: {
  provider: SupportedProviderType;
  apiKey?: string;
  modelId?: string;
}): void {
  if (apiKey)
    process.env[`${provider.toUpperCase().replace(/-/g, "_")}_API_KEY`] =
      apiKey;
  if (modelId)
    process.env[`${provider.toUpperCase().replace(/-/g, "_")}_MODEL_ID`] =
      modelId;
}

export type SupportedProviderType = (typeof supportedProviders)[number];

const baseProviderConfig: Record<SupportedProviderType, ProviderConfigType> = {
  openrouter: {
    label: "OpenRouter",
    value: "openrouter",
    apiKey: null,
    modelId: null,
  },
  bedrock: {
    label: "AWS Bedrock",
    value: "bedrock",
    apiKey: null,
    modelId: null,
  },
  "openai-compatible": {
    label: "OpenAI Compatible",
    value: "openai-compatible",
    apiKey: null,
    modelId: null,
  },
};

type ConfigStoreType = {
  providers: Record<SupportedProviderType, ProviderConfigType>;
  selectedProvider: SupportedProviderType | null;
  setSelectedProvider: (provider: SupportedProviderType) => void;
  getProviderConfig: (provider: SupportedProviderType) => ProviderConfigType;
  fetchApiKeys: () => Promise<void>;
  setApiKey: (provider: SupportedProviderType, apiKey: string) => Promise<void>;
  setModelId: (
    provider: SupportedProviderType,
    modelId: string,
  ) => Promise<void>;
};

export const useConfigStore = create<ConfigStoreType>((set, get) => ({
  providers: baseProviderConfig,
  selectedProvider: null,

  setSelectedProvider: async (provider) => {
    await Bun.secrets.set({
      service: "walker-cli",
      name: "selected-provider",
      value: provider,
    });

    set({ selectedProvider: provider });
  },

  getProviderConfig: (provider) => {
    return get().providers[provider];
  },

  fetchApiKeys: async () => {
    const selectedProvider = await Bun.secrets.get({
      service: "walker-cli",
      name: "selected-provider",
    });

    if (selectedProvider) {
      set({ selectedProvider: selectedProvider as SupportedProviderType });
    }

    const apiKeys = await Promise.all(
      supportedProviders.map(async (provider) => {
        const key = await Bun.secrets.get({
          service: "walker-cli",
          name: `${provider}-api-key`,
        });

        const id = await Bun.secrets.get({
          service: "walker-cli",
          name: `${provider}-model-id`,
        });

        return { provider, apiKey: key, modelId: id };
      }),
    );

    set((state) => {
      const updatedProviders = { ...state.providers };
      apiKeys.forEach(({ provider, apiKey, modelId }) => {
        updatedProviders[provider] = {
          ...updatedProviders[provider],
          apiKey,
          modelId,
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

    setProviderENV({
      provider,
      apiKey,
    });

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

  setModelId: async (provider, modelId) => {
    await Bun.secrets.set({
      service: "walker-cli",
      name: `${provider}-model-id`,
      value: modelId,
    });

    setProviderENV({ provider, modelId });
    set((state) => ({
      providers: {
        ...state.providers,
        [provider]: {
          ...state.providers[provider],
          modelId,
        },
      },
    }));
  },
}));

export function getProviderConfig(
  provider: SupportedProviderType,
): ProviderConfigType {
  const config = useConfigStore.getState().getProviderConfig(provider);
  return config;
}

export function setSelectedProvider(provider: SupportedProviderType): void {
  useConfigStore.getState().setSelectedProvider(provider);
}
