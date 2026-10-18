import Home from "./Home";
import Local from "./Local";
import Config, { configTree } from "./Config";
import { setTab, TABS, useTabStore, type TabType } from "../stores/tab.store";
import { type FocusTree } from "../stores/focus.store";
import { Select } from "./ui/Select";
import { FocusProvider } from "./providers/FocusProvider";
import { useFocusId } from "../hooks/useFocus";
import { getFoucusStyle } from "../style";
import { useMemo } from "react";
import { ConfigProvider } from "./providers/ConfigProvider";

export const navFocusIds = {
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

export const navTree: FocusTree = {
  id: navFocusIds.navigation.value,
  children: [
    {
      id: navFocusIds.navigation.children.homeTabButton.value,
      onClick: () => {
        setTab("home");
      },
    },
    {
      id: navFocusIds.navigation.children.localTabButton.value,
      onClick: () => {
        setTab("local");
      },
    },
    {
      id: navFocusIds.navigation.children.configTabButton.value,
      onClick: () => {
        setTab("config");
      },
    },
  ],
};

function router(tab: TabType): FocusTree {
  return {
    id: "walker",
    children: [
      ...(tab === "config" && configTree ? [configTree] : []),
      navTree,
    ],
  };
}

function App() {
  const tab = useTabStore((state) => state.tab);
  const tree = useMemo(() => router(tab), [tab]);
  const { focusedId } = useFocusId();
  return (
    <FocusProvider tree={tree}>
      <ConfigProvider>
        <box
          style={{
            width: "100%",
            height: "100%",
            flexDirection: "column",
            justifyContent: "flex-end",
            ...getFoucusStyle({ focusedId, id: "walker" }),
          }}
        >
          <scrollbox>
            {tab === "home" && <Home />}
            {tab === "local" && <Local />}
            {tab === "config" && <Config />}
          </scrollbox>
          <box
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "FFFFFF",
              paddingX: 1,
            }}
          >
            <text
              style={{
                fg: "000000",
              }}
            >
              Focused: {focusedId}
            </text>
          </box>
          <Select id="navigation" options={TABS} selected={tab} />
        </box>
      </ConfigProvider>
    </FocusProvider>
  );
}

export default App;
