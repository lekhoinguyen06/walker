import { useEffect } from "react";
import { useConfigStore } from "../stores/config.store";

export function useConfig() {
  const providers = useConfigStore((state) => state.providers);
  const selectedProvider = useConfigStore((state) => state.selectedProvider);
  const setSelectedProvider = useConfigStore(
    (state) => state.setSelectedProvider,
  );
  const getProviderConfig = useConfigStore((state) => state.getProviderConfig);
  const fetchApiKeys = useConfigStore((state) => state.fetchApiKeys);
  const setApiKey = useConfigStore((state) => state.setApiKey);
  const setModelId = useConfigStore((state) => state.setModelId);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  return {
    providers,
    selectedProvider,
    setSelectedProvider,
    getProviderConfig,
    setApiKey,
    setModelId,
  };
}
