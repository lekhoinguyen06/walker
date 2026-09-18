import { create } from "zustand";
import slugify from "slugify";

type ScopeStoryType = {
  activeId: string | null;
  defaultId: string | null;
  setActiveId: (id: string) => void;
  resetActiveId: () => void;
  setDefaultActiveId: (id: string) => void;
};

export const useScopeStore = create<ScopeStoryType>((set) => ({
  activeId: null,
  defaultId: null,
  setActiveId: (id) => set({ activeId: slugify(id) }),
  resetActiveId: () => set((state) => ({ activeId: state.defaultId })),
  setDefaultActiveId: (id) =>
    set((state) => ({
      activeId: state.activeId ?? slugify(id),
      defaultId: state.defaultId ?? slugify(id),
    })),
}));

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
