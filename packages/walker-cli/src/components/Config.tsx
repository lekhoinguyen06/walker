import { secrets } from "bun";
import { useCallback, useEffect, useState } from "react";
import { mask } from "../utils";
import { pushLog } from "../stores/log.store";

function Config() {
  const [provider, setProvider] = useState<"openrouter">("openrouter");
  const [focus, setFocus] = useState<"openrouter">("openrouter");
  const [ORvalue, setORvalue] = useState<string>("");
  const [ORstoredKey, setORstoredKey] = useState<string | null>(null);

  const saveORkey = useCallback(async (val: string) => {
    await secrets.set({
      service: "walker-cli",
      name: "openrouter-api-key",
      value: val,
    });
    process.env.OPENROUTER_API_KEY = val;
    setORstoredKey(val);
  }, []);

  useEffect(() => {
    const load = async () => {
      const key = await secrets.get({
        service: "walker-cli",
        name: "openrouter-api-key",
      });
      if (key) process.env.OPENROUTER_API_KEY = key;
      setORstoredKey(key || null);
    };
    load();
  }, []);

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
        <text>Value: {mask(ORstoredKey)}</text>
        <input
          focused={focus === "openrouter"}
          placeholder="Enter OpenRouter API key"
          value={ORvalue}
          onInput={(v) => setORvalue(v)}
          style={
            {
              // focusedBackgroundColor: "FFFFFF",
              // focusedTextColor: "000000",
            }
          }
          onSubmit={() => {
            setORvalue("");
            saveORkey(ORvalue);
          }}
        />
      </box>
    </box>
  );
}

export default Config;
