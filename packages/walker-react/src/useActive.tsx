import { useActiveStore } from "./useActiveStore";
import slugify from "slugify";

export function useActive(id: string) {
  const activeId = useActiveStore((state) => state.activeId);
  const setActiveId = useActiveStore((state) => state.setActiveId);
  const setDefaultActiveId = useActiveStore(
    (state) => state.setDefaultActiveId,
  );
  const resetActiveId = useActiveStore((state) => state.resetActiveId);

  return {
    active: activeId === slugify(id),
    setActiveId,
    setDefaultActiveId,
    resetActiveId,
  };
}
