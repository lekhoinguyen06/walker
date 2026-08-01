import React, { createContext, useContext } from "react";
import {
  type ActionType,
  type ConfigType,
  type FlowType,
  Runtime,
} from "@repo/core";
import { useActionStore } from "./useActionStore";
import { useHistoryStore } from "./useHistoryStore";
import { useFlowStore } from "./useFlowStore";

type RuntimeProviderProps = {
  config?: Partial<ConfigType>;
  children: React.ReactNode;
};

type RuntimeContextType = {
  runtime: Runtime;
};

const RuntimeContext = createContext<RuntimeContextType | undefined>(undefined);

export function useRuntime() {
  const context = useContext(RuntimeContext);
  if (!context) {
    throw new Error("useRuntime must be used within a RuntimeProvider");
  }
  return context;
}

const mockAction: ActionType = {
  command: "mock",
  message: "Mock action for testing",
  target: "mock",
};

const mockFlow: FlowType = {
  command: "mock",
  description: "Mock flow for testing",
  handler: () => {},
  route: "*",
};

export function RuntimeProvider({ children }: RuntimeProviderProps) {
  const config: ConfigType = {
    mode: "tailored",
    gap: 1000,
    isPaused: false,
    verbose: false,
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
    flowStore: {
      init: useFlowStore((state) => state.init),
      find: useFlowStore((state) => state.find),
      list: useFlowStore((state) => state.list),
      clear: useFlowStore((state) => state.clear),
    },
    flows: [],
  };

  const runtime = new Runtime(config);

  return (
    <RuntimeContext.Provider value={{ runtime }}>
      {children}
    </RuntimeContext.Provider>
  );
}
