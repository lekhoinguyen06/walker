import { useScopeStore } from "@/walker/stores/adapters";
import type { ScopeType } from "walker-core";

type UseScopeReturnType = {
  state: ScopeType;
  setActiveId: (id: string) => void;
  setDefaultActiveId: (id: string) => void;
  resetActiveId: () => void;
};

export function useScope(id: string): UseScopeReturnType {
  const activeId = useScopeStore((state) => state.activeId);
  const setActiveId = useScopeStore((state) => state.setActiveId);
  const setDefaultActiveId = useScopeStore((state) => state.setDefaultActiveId);
  const resetActiveId = useScopeStore((state) => state.resetActiveId);

  return {
    state: activeId === id ? "active" : "inherit",
    setActiveId,
    setDefaultActiveId,
    resetActiveId,
  };
}
