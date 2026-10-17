import { useState } from "react";
import { mask } from "../utils";
import { useConfig } from "../hooks/useConfig";

function Config() {
  const [focus, setFocus] = useState<"openrouter">("openrouter");
  const { providers, setApiKey, setModelId } = useConfig();
  const [ORinput, setORinput] = useState("");

  return (
    <box
      style={{
        width: "100%",
        flexGrow: 1,
        flexDirection: "column",
      }}
    >
      <box
        style={{
          width: "100%",
          flexDirection: "column",
          gap: 1,
          padding: 1,
        }}
      >
        <text>OpenRouter</text>
        <text>Value: {mask(providers.openrouter.apiKey)}</text>
        <input
          focused={focus === "openrouter"}
          placeholder="Enter OpenRouter API key"
          value={ORinput}
          onInput={(v) => setORinput(v)}
          style={
            {
              // focusedBackgroundColor: "FFFFFF",
              // focusedTextColor: "000000",
            }
          }
          onSubmit={() => {
            setORinput("");
            setApiKey("openrouter", ORinput);
          }}
        />
      </box>
    </box>
  );
}

export default Config;
