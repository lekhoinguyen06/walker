import React, { createContext, useContext } from "react";
import {
  type ActionType,
  type ConfigType,
  type FlowType,
  Runtime,
} from "@repo/core";

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
      pushBack: (action) => {},
      pushFront: (action) => {},
      popBack: () => mockAction,
      popFront: () => mockAction,
      list: () => [],
      clear: () => [],
    },
    historyStore: {
      pushBack: (action) => {},
      pushFront: (action) => {},
      popBack: () => mockAction,
      popFront: () => mockAction,
      list: () => [],
      clear: () => [],
    },
    flowStore: {
      init: (flows) => {},
      find: (query) => mockFlow,
      list: () => [],
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
