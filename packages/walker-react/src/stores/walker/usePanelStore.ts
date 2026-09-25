import {
  panelVariants,
  type DevTabType,
  type PanelTabType,
} from "@/components/walker/ui";
import type { panelContentVariants } from "@/components/walker/ui/panel/PanelContent";
import type { VariantProps } from "class-variance-authority";
import { create } from "zustand";

export type PanelStoreType = {
  url: string;

  setUrl: (url: string) => void;

  // Variants
  position: VariantProps<typeof panelVariants>["position"];
  style: VariantProps<typeof panelContentVariants>["style"];
  isHidden: boolean;

  // Tabs
  tab?: PanelTabType;
  openTab: () => void;
  closeTab: () => void;
  switchTab: (tab: PanelTabType) => void;

  // Developeent tabs
  devTab?: DevTabType;
  openDevTab: (devTab: DevTabType) => void;
  closeDevTab: () => void;

  setPosition: (
    position: VariantProps<typeof panelVariants>["position"],
  ) => void;
  setStyle: (style: VariantProps<typeof panelContentVariants>["style"]) => void;
  setIsHidden: (isHidden: boolean) => void;

  // Constructor
  setStore: (state: Partial<PanelStoreType>) => void;
};

export const usePanelStore = create<PanelStoreType>((set) => ({
  setStore: (state: Partial<PanelStoreType>) => set(state),

  url: "",
  setUrl: (url: string) => set({ url }),

  position: "bottom",
  setPosition: (position: VariantProps<typeof panelVariants>["position"]) =>
    set({ position }),
  style: "primary",
  setStyle: (style: VariantProps<typeof panelContentVariants>["style"]) =>
    set({ style }),
  isHidden: false,
  setIsHidden: (isHidden: boolean) => set({ isHidden }),

  tab: undefined,
  switchTab: (tab: "user" | "dev") => set({ tab }),
  openTab: () => set({ tab: "user" }),
  closeTab: () => set({ tab: undefined }),
  setTab: (tab: "user" | "dev") => set({ tab }),

  devTab: undefined,
  closeDevTab: () => set({ devTab: undefined }),
  openDevTab: (devTab?: "chat" | "input" | "map" | "stack" | "history") =>
    set({ devTab: devTab, isHidden: true }),
}));
