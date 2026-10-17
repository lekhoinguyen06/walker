import { useEffect } from "react";
import { useConfigStore } from "../stores/config.store";

export function useConfig() {
  const providers = useConfigStore((state) => state.providers);
  const selectedProvider = useConfigStore((state) => state.selectedProvider);
  const setSelectedProvider = useConfigStore(
    (state) => state.setSelectedProvider,
  );
  const setApiKey = useConfigStore((state) => state.setApiKey);
  const setProviderConfig = useConfigStore((state) => state.setProviderConfig);

  const hydrate = useConfigStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return {
    providers,
    selectedProvider,
    setSelectedProvider,
    setApiKey,
    setProviderConfig,
  };
}
