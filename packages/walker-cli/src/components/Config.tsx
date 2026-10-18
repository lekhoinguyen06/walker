import { useCallback, useEffect, useState } from "react";
import { mask } from "../utils";
import { useConfig } from "../hooks/useConfig";
import {
  getProviderConfig,
  getSecret,
  setSelectedProvider,
  supportedProviders,
  type SupportedProviderType,
} from "../stores/config.store";
import { useFocusId } from "../hooks/useFocus";
import type { FocusTree } from "../stores/focus.store";
import { getFoucusStyle } from "../style";
import { InputField } from "./ui/InputField";

export const configTree: FocusTree = {
  id: "config",
  children: supportedProviders.map((p) => ({
    id: getProviderConfig(p).value,
    children: [
      { id: `${p}-api-key-input` },
      { id: `${p}-model-id-input` },
      {
        id: `${p}-select-provider-button`,
        onClick: () => {
          setSelectedProvider(p);
        },
      },
    ],
  })),
};

function ProviderForm({ provider }: { provider: SupportedProviderType }) {
  const { setApiKey, setProviderConfig, selectedProvider } = useConfig();
  const providerConfig = getProviderConfig(provider);
  const { focusedId } = useFocusId();
  const [apiKeyInputValue, setApiKeyInputValue] = useState("");
  const [modelIdInput, setModelIdInput] = useState("");
  const [currentApiKeyValue, setCurrentApiKeyValue] = useState<string | null>(
    null,
  );

  const fetchApiKey = async () => {
    const key = await getSecret(`${provider}-api-key`);
    setCurrentApiKeyValue(mask(key));
  };

  useEffect(() => {
    fetchApiKey();
  }, [provider]);
  return (
    <box
      focused={focusedId === providerConfig.value}
      style={{
        width: "100%",
        flexDirection: "column",
        gap: 1,
        padding: 1,
        ...getFoucusStyle({
          focusedId,
          id: providerConfig.value,
        }),
      }}
    >
      <text>{providerConfig.label}</text>
      <box
        style={{
          gap: 1,
          paddingX: 1,
        }}
      >
        <InputField
          focusedId={focusedId}
          id={`${provider}-api-key-input`}
          title="API Key"
          placeholder={`Enter ${providerConfig.label} API key`}
          value={apiKeyInputValue}
          currentValue={currentApiKeyValue || ""}
          onInput={(v) => setApiKeyInputValue(v)}
          onSubmit={async () => {
            if (apiKeyInputValue.length === 0) {
              return;
            }
            setApiKeyInputValue("");
            await setApiKey(provider, apiKeyInputValue);
            await fetchApiKey();
          }}
          sensitive
        />
        <InputField
          focusedId={focusedId}
          id={`${provider}-model-id-input`}
          title="Model ID"
          placeholder={`Enter model ID`}
          value={modelIdInput}
          currentValue={providerConfig.modelId || ""}
          onInput={(v) => setModelIdInput(v)}
          onSubmit={() => {
            if (modelIdInput.length === 0) {
              return;
            }
            setModelIdInput("");
            setProviderConfig({
              provider,
              config: {
                modelId: modelIdInput,
              },
            });
          }}
        />
        <box
          focused={focusedId === `${provider}-select-provider-button`}
          style={{
            padding: 1,

            ...getFoucusStyle({
              focusedId,
              id: `${provider}-select-provider-button`,
              selected: selectedProvider === provider,
            }),
          }}
        >
          <text
          // style={{ fg: selectedProvider === provider ? "000000" : undefined }}
          >
            {selectedProvider === provider ? "Selected" : "Switch"}
          </text>
        </box>
      </box>
    </box>
  );
}

function Config() {
  const { focusedId } = useFocusId();
  return (
    <box
      style={{
        flexGrow: 1,
        flexDirection: "column",
        ...getFoucusStyle({
          focusedId,
          id: "config",
        }),
      }}
    >
      <ProviderForm provider="openrouter" />
      <ProviderForm provider="bedrock" />
      <ProviderForm provider="openai-compatible" />
    </box>
  );
}

export default Config;
