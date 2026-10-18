import { create } from "zustand";
import { z } from "zod";
import { homedir } from "node:os";
import { join } from "node:path";
import { mkdir } from "node:fs/promises";

export const supportedProviders = [
  "openrouter",
  "bedrock",
  "openai-compatible",
] as const;

const SupportedProvidersSchema = z.enum(supportedProviders);

export type SupportedProviderType = (typeof supportedProviders)[number];

const BaseProviderConfigSchema = z.object({
  label: z.string(),
  value: z.enum(supportedProviders),
  modelId: z.string().nullable(),
});

type BaseProviderConfigType = z.infer<typeof BaseProviderConfigSchema>;

const OpenRouterProviderConfigSchema = BaseProviderConfigSchema.extend({
  label: z.literal("OpenRouter"),
  value: z.literal("openrouter"),
});

const BedrockProviderConfigSchema = BaseProviderConfigSchema.extend({
  label: z.literal("AWS Bedrock"),
  value: z.literal("bedrock"),
  region: z.string().optional(),
});

const OpenAICompatibleProviderConfigSchema = BaseProviderConfigSchema.extend({
  label: z.literal("OpenAI Compatible"),
  value: z.literal("openai-compatible"),
  providerName: z.string().nullable(),
  baseURL: z.string().nullable(),
});

const ProvidersSchema = z.object({
  openrouter: OpenRouterProviderConfigSchema,
  bedrock: BedrockProviderConfigSchema,
  "openai-compatible": OpenAICompatibleProviderConfigSchema,
});

type OpenRouterProviderConfigType = z.infer<
  typeof OpenRouterProviderConfigSchema
>;
type BedrockProviderConfigType = z.infer<typeof BedrockProviderConfigSchema>;
type OpenAICompatibleProviderConfigType = z.infer<
  typeof OpenAICompatibleProviderConfigSchema
>;
type ProvidersType = z.infer<typeof ProvidersSchema>;

const ConfigSchema = z.object({
  providers: ProvidersSchema,
  selectedProvider: SupportedProvidersSchema.nullable(),
});

type ConfigType = z.infer<typeof ConfigSchema>;

const initialConfig: ConfigType = {
  providers: {
    openrouter: {
      label: "OpenRouter",
      value: "openrouter",
      modelId: null,
    },
    bedrock: {
      label: "AWS Bedrock",
      value: "bedrock",
      modelId: null,
    },
    "openai-compatible": {
      label: "OpenAI Compatible",
      value: "openai-compatible",
      modelId: null,
      providerName: null,
      baseURL: null,
    },
  },
  selectedProvider: null,
} as const;

type ConfigStoreType = ConfigType & {
  setSelectedProvider: (provider: SupportedProviderType) => Promise<void>;
  hydrate: () => Promise<void>;

  getSelectedProvider: () => Promise<{
    providerKey: SupportedProviderType | null;
    apiKey: string | null;
  }>;
  setApiKey: (provider: SupportedProviderType, apiKey: string) => Promise<void>;
  setProviderConfig: ({
    provider,
    config,
  }: {
    provider: SupportedProviderType;
    config: Partial<ProvidersType[typeof provider]>;
  }) => Promise<void>;
};

export const useConfigStore = create<ConfigStoreType>((set, get) => ({
  providers: initialConfig.providers,
  selectedProvider: null,

  setSelectedProvider: async (provider: SupportedProviderType) => {
    set({ selectedProvider: provider });
    await saveState({
      providers: get().providers,
      selectedProvider: provider,
    });
  },

  hydrate: async () => {
    const config = await loadConfig();
    set({
      providers: config.providers,
      selectedProvider: config.selectedProvider,
    });
  },

  getSelectedProvider: async () => {
    const state = get();
    const apiKey = await getSecret(`${state.selectedProvider}-api-key`);

    return {
      providerKey: state.selectedProvider,
      apiKey: apiKey,
    };
  },

  setApiKey: async (provider: SupportedProviderType, apiKey: string) => {
    await setSecret(`${provider}-api-key`, apiKey);
  },

  setProviderConfig: async ({ provider, config }) => {
    const state = get();
    if (!state.providers) {
      throw new Error("Providers not initialized");
    }
    set({
      providers: {
        ...state.providers,
        [provider]: { ...state.providers[provider], ...config },
      },
    });
    await saveState({
      providers: get().providers,
      selectedProvider: get().selectedProvider,
    });
  },
}));

const dir = process.env.XDG_CONFIG_HOME
  ? join(process.env.XDG_CONFIG_HOME, "walker-cli")
  : join(homedir(), ".config", "walker-cli");
const file = Bun.file(join(dir, "config.json"));

export async function loadConfig(): Promise<ConfigType> {
  const exist = await file.exists();
  if (!exist) {
    await saveState(initialConfig);
    return initialConfig;
  }
  const content = await file.json();
  return ConfigSchema.parse(content);
}

async function saveState(state: ConfigType): Promise<void> {
  await mkdir(dir, { recursive: true });
  ConfigSchema.parse(state);
  await Bun.write(file, JSON.stringify(state, null, 2));
}

export async function getSecret(name: string): Promise<string | null> {
  return await Bun.secrets.get({
    service: "walker-cli",
    name,
  });
}

export async function setSecret(name: string, value: string): Promise<void> {
  await Bun.secrets.set({
    service: "walker-cli",
    name,
    value,
  });
}

export function getProviderConfig(provider: SupportedProviderType) {
  const state = useConfigStore.getState();
  if (!state.providers) {
    throw new Error("Providers not initialized");
  }
  return state.providers[provider];
}

export async function getSelectedProvider() {
  return await useConfigStore.getState().getSelectedProvider();
}

export function setSelectedProvider(provider: SupportedProviderType) {
  useConfigStore.getState().setSelectedProvider(provider);
}
