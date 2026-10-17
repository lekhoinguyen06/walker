import { useState } from "react";
import { mask } from "../utils";
import { useConfig } from "../hooks/useConfig";
import {
  getProviderConfig,
  setSelectedProvider,
  supportedProviders,
  type SupportedProviderType,
} from "../stores/config.store";
import { useFocusId } from "../hooks/useFocus";
import type { FocusTree } from "../stores/focus.store";
import { getFoucusStyle } from "../style";

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
  const {
    getProviderConfig,
    setApiKey,
    setModelId,
    selectedProvider,
    setSelectedProvider,
  } = useConfig();
  const providerConfig = getProviderConfig(provider);
  const { focusedId } = useFocusId();
  const [keyInput, setKeyInput] = useState("");
  const [idInput, setIdInput] = useState("");
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
        <text>API Key: {mask(providerConfig.apiKey)}</text>
        <input
          focused={focusedId === `${provider}-api-key-input`}
          placeholder={`Enter ${providerConfig.label} API key`}
          value={keyInput}
          onInput={(v) => setKeyInput(v)}
          style={
            {
              // focusedBackgroundColor: "FFFFFF",
              // focusedTextColor: "000000",
            }
          }
          onSubmit={() => {
            setKeyInput("");
            setApiKey(provider, keyInput);
          }}
        />
        <text>Model ID: {providerConfig.modelId}</text>
        <input
          focused={focusedId === `${provider}-model-id-input`}
          placeholder={`Enter model ID`}
          value={idInput}
          onInput={(v) => setIdInput(v)}
          style={
            {
              // focusedBackgroundColor: "FFFFFF",
              // focusedTextColor: "000000",
            }
          }
          onSubmit={() => {
            setIdInput("");
            setModelId(provider, idInput);
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
