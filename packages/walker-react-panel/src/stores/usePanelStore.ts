import {
  panelVariants,
  type PanelModalType,
  type PanelTabType,
  type panelContentVariants,
} from "../components/panel";
import type { VariantProps } from "class-variance-authority";
import type { ContextType } from "walker-shared";
import { create } from "zustand";

export type PanelStoreType = {
  url: string;
  setUrl: (url: string) => void;

  // Walker
  context: ContextType;
  setContext: (context: ContextType) => void;
  mergeContext: (context: Partial<ContextType>) => void;

  // Variants
  position: VariantProps<typeof panelVariants>["position"];
  style: VariantProps<typeof panelContentVariants>["style"];
  isHidden: boolean;
  setIsHidden: (isHidden: boolean) => void;
  setPosition: (
    position: VariantProps<typeof panelVariants>["position"],
  ) => void;

  // Tabs
  tab: PanelTabType;
  setTab: (tab: PanelTabType) => void;

  // Modals
  modal: PanelModalType;
  setModal: (modal: PanelModalType) => void;

  // Constructor
  setStore: (state: Partial<PanelStoreType>) => void;
};

export const usePanelStore = create<PanelStoreType>((set) => ({
  setStore: (state: Partial<PanelStoreType>) => set(state),
  url: "",
  setUrl: (url: string) => set({ url }),

  context: {
    userPrompt: "",
    flows: [],
  },
  setContext: (context: ContextType) => set({ context }),
  mergeContext: (context: Partial<ContextType>) =>
    set((state) => ({
      context: {
        userPrompt: context.userPrompt ?? state.context.userPrompt,
        flows: [...state.context.flows, ...(context.flows ?? [])],
        gapTimeMs: context.gapTimeMs ?? state.context.gapTimeMs,
        globalHooks: {
          beforeHooks: [
            ...(state.context.globalHooks?.beforeHooks ?? []),
            ...(context.globalHooks?.beforeHooks ?? []),
          ],
          afterHooks: [
            ...(state.context.globalHooks?.afterHooks ?? []),
            ...(context.globalHooks?.afterHooks ?? []),
          ],
        },
        historyWindowSize:
          context.historyWindowSize ?? state.context.historyWindowSize,
      },
    })),

  position: "bottom",
  setPosition: (position: VariantProps<typeof panelVariants>["position"]) =>
    set({ position }),
  style: "primary",
  setStyle: (style: VariantProps<typeof panelContentVariants>["style"]) =>
    set({ style }),
  isHidden: false,
  setIsHidden: (isHidden: boolean) => set({ isHidden }),

  tab: null,
  setTab: (tab: PanelTabType) => set({ tab }),

  modal: null,
  setModal: (modal: PanelModalType) => set({ modal }),
}));
