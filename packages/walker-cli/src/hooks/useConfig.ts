import { useEffect } from "react";
import { useConfigStore } from "../stores/config.store";

export function useConfig() {
  const providers = useConfigStore((state) => state.providers);
  const fetchApiKeys = useConfigStore((state) => state.fetchApiKeys);
  const setApiKey = useConfigStore((state) => state.setApiKey);
  const setModelId = useConfigStore((state) => state.setModelId);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  return {
    providers,
    setApiKey,
    setModelId,
  };
}
