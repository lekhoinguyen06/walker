import { useScopeStore } from "@/stores/adapters";
import slugify from "slugify";

export function useScope(id: string) {
  const activeId = useScopeStore((state) => state.activeId);
  const setActiveId = useScopeStore((state) => state.setActiveId);
  const setDefaultActiveId = useScopeStore((state) => state.setDefaultActiveId);
  const resetActiveId = useScopeStore((state) => state.resetActiveId);

  return {
    active: activeId === slugify(id),
    setActiveId,
    setDefaultActiveId,
    resetActiveId,
  };
}
