import React, { createContext, useContext, useEffect, useMemo } from "react";
import {
  type ActionType,
  type AdapterType,
  type ConfigType,
  type FlowsType,
  type HooksType,
  Runtime,
  webFlows,
  webHooks,
} from "walker-core";
import { useActionStore } from "@/action";
import { useHistoryStore } from "@/history";
import { mouseHook } from "@/mouse";
import { App, type ElementProps } from "@/item";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import { useScope } from "@/scope";

// --------------------------------- Runtime Hook ---------------------------------
export function useRuntime() {
  const context = useContext(RuntimeContext);
  if (!context) {
    throw new Error("useRuntime must be used within a RuntimeProvider");
  }
  return context;
}

// --------------------------------- Runtime Provider ---------------------------------
type RuntimeProviderProps = {
  config?: Partial<ConfigType>;
  hooks?: HooksType;
  flows?: FlowsType;
  mouse?: React.ReactNode;
};

type RuntimeContextType = {
  runtime: Runtime;
  walk: () => void;
  actionsInQueueCount: number;
  isWalking: boolean;
};

const RuntimeContext = createContext<RuntimeContextType | undefined>(undefined);

export function RuntimeProvider({
  config: userConfig,
  children,
}: {
  config: RuntimeProviderProps & { app: ElementProps };
  children: React.ReactNode;
}) {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <RuntimeProviderContent config={userConfig}>
        {children}
      </RuntimeProviderContent>
    </QueryClientProvider>
  );
}

function RuntimeProviderContent({
  config: userConfig,
  children,
}: {
  config: RuntimeProviderProps & { app: ElementProps };
  children: React.ReactNode;
}) {
  const { setDefaultActiveId } = useScope(userConfig.app.id);

  useEffect(() => {
    console.log("Setting default active id", userConfig.app.id);
    setDefaultActiveId(userConfig.app.id);
  }, [setDefaultActiveId, userConfig.app.id]);

  const config: ConfigType = useMemo(
    () => ({
      mode: "tailored",
      isLoading: false,
      gap: 400,
      verbose: false,
      ...userConfig.config,
    }),
    [userConfig.config],
  );

  const actions = useActionStore((state) => state.list());

  const adapter: AdapterType = {
    actionStore: {
      pushBack: useActionStore((state) => state.pushBack),
      pushFront: useActionStore((state) => state.pushFront),
      popBack: useActionStore((state) => state.popBack),
      popFront: useActionStore((state) => state.popFront),
      list: useActionStore((state) => state.list),
      clear: useActionStore((state) => state.clear),
    },
    historyStore: {
      updateBack: useHistoryStore((state) => state.updateBack),
      pushBack: useHistoryStore((state) => state.pushBack),
      pushFront: useHistoryStore((state) => state.pushFront),
      popBack: useHistoryStore((state) => state.popBack),
      popFront: useHistoryStore((state) => state.popFront),
      list: useHistoryStore((state) => state.list),
      clear: useHistoryStore((state) => state.clear),
    },
  };

  const runtime = new Runtime({
    config,
    adapter,
    flows: new Map([...webFlows, ...(userConfig.flows || [])]),
    hooks: {
      ...webHooks,
      onMouse: mouseHook,
      ...userConfig.hooks,
    },
  });

  const { mutate: walk, isPending: isWalking } = useMutation({
    mutationFn: async () => {
      await runtime.next();
    },
  });

  return (
    <RuntimeContext.Provider
      value={{
        runtime,
        walk,
        isWalking,
        actionsInQueueCount: actions.length,
      }}
    >
      <App {...userConfig.app}>{children}</App>
    </RuntimeContext.Provider>
  );
}
