import {
  panelVariants,
  type PanelModalType,
  type PanelTabType,
  type panelContentVariants,
} from "../components/panel";
import type { VariantProps } from "class-variance-authority";
import { webFlows, type Context } from "walker-dom";
import { create } from "zustand";

export type PanelStoreType = {
  url: string;
  setUrl: (url: string) => void;

  // Walker
  context: Context;
  setContext: (context: Context) => void;
  setUserPrompt: (userPrompt: string) => void;

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
    flows: webFlows,
  },
  setContext: (context: Context) => set({ context }),
  setUserPrompt: (userPrompt: string) =>
    set((state) => ({ context: { ...state.context, userPrompt } })),

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
