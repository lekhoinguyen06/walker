import { useEffect } from "react";
import Home from "./Home";
import Local from "./Local";
import Config from "./Config";
import { secrets } from "bun";
import { isTab, useTabStore } from "./store";

function App() {
  const tab = useTabStore((state) => state.tab);
  const setTab = useTabStore((state) => state.setTab);

  useEffect(() => {
    const load = async () => {
      const key = await secrets.get({
        service: "walker-cli",
        name: "openrouter-api-key",
      });
      if (key) process.env.OPENROUTER_API_KEY = key;
    };
    load();
  }, []);

  return (
    <box
      style={{
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      {tab === "home" && <Home />}
      {tab === "local" && <Local />}
      {tab === "config" && <Config />}
      <box
        style={{
          width: "100%",
          flexShrink: 0,
        }}
      >
        <tab-select
          focused
          onSelect={(_index: number, option: { value?: string } | null) => {
            setTab(isTab(option?.value));
          }}
          showDescription={false}
          style={{
            width: "100%",
            flexDirection: "column",
            selectedTextColor: "000000",
            selectedDescriptionColor: "FFFFFF",
            focusedBackgroundColor: "000000",
            selectedBackgroundColor: "FFFFFF",
          }}
          options={[
            {
              name: "Login",
              description: "Authenticate with remote Walker Server",
              value: "login",
            },
            {
              name: "Local",
              description: "Start local Walker Server",
              value: "local",
            },
            {
              name: "Config",
              description: "Configure Walker CLI settings",
              value: "config",
            },
          ]}
        ></tab-select>
      </box>
    </box>
  );
}

export default App;
