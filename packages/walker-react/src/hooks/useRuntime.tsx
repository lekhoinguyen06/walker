import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import {
  LoggerLevel,
  getLogger,
  webFlows,
  webHooks,
  type ContextType,
  type RuntimeType,
  runtime,
} from "walker-core";
import { App, type ElementProps } from "@/components/walker/item";
import { useScope } from "./useScope";
import {
  useActionStore,
  useHistoryStore,
  useMouseStore,
} from "@/stores/adapters";

// --------------------------------- Runtime Hook ---------------------------------
export function useRuntime() {
  const context = useContext(RuntimeContext);
  if (!context) {
    throw new Error("useRuntime must be used within a RuntimeProvider");
  }
  return context;
}

// --------------------------------- Runtime Provider ---------------------------------
type RuntimeProviderProps = Partial<ContextType>;

type RuntimeContextType = {
  runtime: RuntimeType;
  walk: () => void;
  actionsInQueueCount: number;
  isWalking: boolean;
  config: ContextType["config"];
  setConfig: React.Dispatch<React.SetStateAction<ContextType["config"]>>;
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
  const [config, setconfig] = useState<ContextType["config"]>({
    loop: false,
    isLoading: false,
    gap: 200,
    verbose: false,
    url: undefined,
    ...userConfig.config,
  });

  useEffect(() => {
    setDefaultActiveId(userConfig.app.id);
  }, [setDefaultActiveId, userConfig.app.id]);

  const actions = useActionStore((state) => state.list());

  const adapter: ContextType["adapter"] = {
    actionStore: {
      pushBack: useActionStore((state) => state.pushBack),
      pushFront: useActionStore((state) => state.pushFront),
      popBack: useActionStore((state) => state.popBack),
      popFront: useActionStore((state) => state.popFront),
      list: useActionStore((state) => state.list),
      clear: useActionStore((state) => state.clear),
    },
    historyStore: {
      pushLog: useHistoryStore((state) => state.pushLog),
      pushBack: useHistoryStore((state) => state.pushBack),
      pushFront: useHistoryStore((state) => state.pushFront),
      popBack: useHistoryStore((state) => state.popBack),
      popFront: useHistoryStore((state) => state.popFront),
      list: useHistoryStore((state) => state.list),
      clear: useHistoryStore((state) => state.clear),
    },
    mouseStore: {
      x: useMouseStore((state) => state.x),
      y: useMouseStore((state) => state.y),
      setX: useMouseStore((state) => state.setX),
      setY: useMouseStore((state) => state.setY),
    },
  };

  const runtimeClient = useMemo(() => {
    return runtime({
      adapter,
      config,
      hooks: { ...webHooks, ...userConfig.hooks },
      flows: new Map([
        ...webFlows,
        ...(userConfig.flows ? userConfig.flows : []),
      ]),
      logger: getLogger(LoggerLevel.TRACE),
    });
  }, [adapter, config, webHooks, webFlows]);

  const { mutate: walk, isPending: isWalking } = useMutation({
    mutationFn: async () => {
      await runtimeClient.next();
    },
  });

  return (
    <RuntimeContext.Provider
      value={{
        runtime: runtimeClient,
        walk,
        isWalking,
        actionsInQueueCount: actions.length,
        config,
        setConfig: setconfig,
      }}
    >
      <App {...userConfig.app}>{children}</App>
    </RuntimeContext.Provider>
  );
}
