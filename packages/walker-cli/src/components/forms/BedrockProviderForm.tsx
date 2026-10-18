import { useEffect, useState } from "react";
import { useConfig } from "../../hooks/useConfig";
import { useFocusId } from "../../hooks/useFocus";
import {
  getProviderConfig,
  getSecret,
  setSelectedProvider,
  type SupportedProviderType,
} from "../../stores/config.store";
import { mask } from "../../utils";
import { getFoucusStyle } from "../../style";
import { InputField } from "../ui/InputField";
import type { FocusTree } from "../../stores/focus.store";

const provider: SupportedProviderType = "bedrock";

export const bedrockTree: FocusTree = {
  id: provider,
  children: [
    { id: `${provider}-api-key-input` },
    { id: `${provider}-model-id-input` },
    { id: `${provider}-region-input` },
    {
      id: `${provider}-select-provider-button`,
      onClick: () => {
        setSelectedProvider(provider);
      },
    },
  ],
};

export function BedrockProviderForm() {
  const provider: SupportedProviderType = "bedrock";
  const { setApiKey, setProviderConfig, selectedProvider } = useConfig();
  const providerConfig = getProviderConfig(provider);
  const { focusedId } = useFocusId();
  const [apiKeyInputValue, setApiKeyInputValue] = useState("");
  const [modelIdInputValue, setModelIdInputValue] = useState("");
  const [regionInputValue, setRegionInputValue] = useState("");
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
          value={modelIdInputValue}
          currentValue={providerConfig.modelId || ""}
          onInput={(v) => setModelIdInputValue(v)}
          onSubmit={() => {
            if (modelIdInputValue.length === 0) {
              return;
            }
            setModelIdInputValue("");
            setProviderConfig({
              provider,
              config: {
                modelId: modelIdInputValue,
              },
            });
          }}
        />
        <InputField
          focusedId={focusedId}
          id={`${provider}-region-input`}
          title="Region"
          placeholder={`Enter AWS region (e.g., us-east-1)`}
          value={regionInputValue}
          currentValue={providerConfig.region || ""}
          onInput={(v) => setRegionInputValue(v)}
          onSubmit={() => {
            if (regionInputValue.length === 0) {
              return;
            }
            setRegionInputValue("");
            setProviderConfig({
              provider,
              config: {
                region: regionInputValue,
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
