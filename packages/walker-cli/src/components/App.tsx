import { useEffect } from "react";
import Home from "./Home";
import Local from "./Local";
import Config from "./Config";
import { secrets } from "bun";
import { setTab, TABS, useTabStore } from "../stores/tab.store";
import { type FocusTree } from "../stores/focus.store";
import { useFocus } from "../hooks/useFocus";
import { pushLog, useLogStore } from "../stores/log.store";

const focusTree: FocusTree = {
  id: "navigation",
  children: [
    {
      id: "home-tab-button",
      onClick: () => {
        setTab("home");
      },
    },
    {
      id: "local-tab-button",
      onClick: () => {
        setTab("local");
      },
    },
    {
      id: "config-tab-button",
      onClick: () => {
        setTab("config");
      },
    },
  ],
};

function App() {
  const tab = useTabStore((state) => state.tab);
  const { focusedId } = useFocus(focusTree);

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
        focused={focusedId === "navigation"}
        style={{
          width: "100%",
          flexShrink: 0,
          flexDirection: "row",
          backgroundColor: focusedId === "navigation" ? "808080" : undefined,
        }}
      >
        {TABS.map((name) => {
          return (
            <box
              focused={focusedId === name + "-tab-button"}
              key={name}
              style={{
                minWidth: 10,
                paddingX: 1,
                backgroundColor:
                  focusedId === name + "-tab-button" ? "808080" : undefined,
              }}
            >
              <text>{name}</text>
            </box>
          );
        })}
      </box>
    </box>
  );
}

export default App;
