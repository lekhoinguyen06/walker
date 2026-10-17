import { useEffect } from "react";
import Home from "./Home";
import Local from "./Local";
import Config from "./Config";
import { secrets } from "bun";
import { setTab, TABS, useTabStore } from "../stores/tab.store";
import { type FocusTree } from "../stores/focus.store";
import { useFocus } from "../hooks/useFocus";
import { Select } from "./ui/Select";
import { FocusProvider } from "./ui/Focus";

const focusIds = {
  navigation: {
    value: "navigation",
    children: {
      homeTabButton: {
        value: "navigation-home-select-button",
      },
      localTabButton: {
        value: "navigation-local-select-button",
      },
      configTabButton: {
        value: "navigation-config-select-button",
      },
    },
  },
} as const;

export const focusTree: FocusTree = {
  id: focusIds.navigation.value,
  children: [
    {
      id: focusIds.navigation.children.homeTabButton.value,
      onClick: () => {
        setTab("home");
      },
    },
    {
      id: focusIds.navigation.children.localTabButton.value,
      onClick: () => {
        setTab("local");
      },
    },
    {
      id: focusIds.navigation.children.configTabButton.value,
      onClick: () => {
        setTab("config");
      },
    },
  ],
};

export function getFoucusStyle({
  focusedId,
  id,
  selected,
}: {
  focusedId: string | null;
  id: string;
  selected?: boolean;
}) {
  if (selected) {
    return { backgroundColor: "606060" };
  }
  return focusedId === id ? { backgroundColor: "202020" } : {};
}

function App() {
  const tab = useTabStore((state) => state.tab);

  return (
    <FocusProvider tree={focusTree}>
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
        {/*<box
          focused={focusedId === "navigation"}
          style={{
            width: "100%",
            flexShrink: 0,
            flexDirection: "row",
            ...getFoucusStyle({ focusedId, id: "navigation" }),
          }}
        >
          {TABS.map(({ value, label }) => {
            return (
              <box
                focused={focusedId === value + "-tab-button"}
                key={value}
                style={{
                  minWidth: 10,
                  paddingX: 1,
                  ...getFoucusStyle({
                    focusedId,
                    id: value + "-tab-button",
                    selected: tab === value,
                  }),
                }}
              >
                <text>{label}</text>
              </box>
            );
          })}
        </box>*/}
        <Select
          id="navigation"
          options={TABS}
          selected={tab}
          onSelectChange={(value) => {
            setTab(value);
          }}
        />
      </box>
    </FocusProvider>
  );
}

export default App;
