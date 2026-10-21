import type { ContextType } from "walker-core";
import { useConfigStore } from "../stores/adapters";
import { useEffect } from "react";

export function useConfig() {
  const config = useConfigStore((state) => state.config);
  const setConfig = useConfigStore((state) => state.setConfig);
  const updateConfig = useConfigStore((state) => state.updateConfig);
  const clearConfig = useConfigStore((state) => state.clearConfig);

  return {
    config,
    setConfig,
    updateConfig,
    clearConfig,
  };
}
