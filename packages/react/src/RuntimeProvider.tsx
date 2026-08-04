import React, { createContext, useContext } from "react";
import { type AdapterConfigType, type ConfigType, Runtime } from "@repo/core";
import { useActionStore } from "./useActionStore";
import { useHistoryStore } from "./useHistoryStore";

// --------------------------------- Runtime Hook ---------------------------------
export function useRuntime() {
  const context = useContext(RuntimeContext);
  if (!context) {
    throw new Error("useRuntime must be used within a RuntimeProvider");
  }
  return context.runtime;
}

// --------------------------------- Runtime Provider ---------------------------------
type RuntimeProviderProps = {
  config: Partial<ConfigType>;
  children: React.ReactNode;
};

type RuntimeContextType = {
  runtime: Runtime;
};

const RuntimeContext = createContext<RuntimeContextType | undefined>(undefined);

export function RuntimeProvider({
  config: userConfig,
  children,
}: RuntimeProviderProps) {
  const config: ConfigType = {
    ...userConfig,
    mode: "tailored",
    gap: 1000,
    isPaused: false,
    verbose: false,
    flows: [],
    ...userConfig,
  };

  const adapterConfig: AdapterConfigType = {
    actionStore: {
      pushBack: useActionStore((state) => state.pushBack),
      pushFront: useActionStore((state) => state.pushFront),
      popBack: useActionStore((state) => state.popBack),
      popFront: useActionStore((state) => state.popFront),
      list: useActionStore((state) => state.list),
      clear: useActionStore((state) => state.clear),
    },
    historyStore: {
      pushBack: useHistoryStore((state) => state.pushBack),
      pushFront: useHistoryStore((state) => state.pushFront),
      popBack: useHistoryStore((state) => state.popBack),
      popFront: useHistoryStore((state) => state.popFront),
      list: useHistoryStore((state) => state.list),
      clear: useHistoryStore((state) => state.clear),
    },
  };

  const runtime = new Runtime({ config, adapterConfig });

  return (
    <RuntimeContext.Provider value={{ runtime }}>
      {children}
    </RuntimeContext.Provider>
  );
}
