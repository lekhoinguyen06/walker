import "@/styles/globals.css";

import { cva, type VariantProps } from "class-variance-authority";
import { PanelContent } from "./PanelContent";
import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { useOnClickOutside } from "usehooks-ts";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { PanelTag } from "./PanelTag";
import { PanelToast } from "./PanelToast";
import { usePanel } from "@/hooks";

export function togglePanelPosition(position: PanelPosition): PanelPosition {
  const index = PANEL_POSITIONS.indexOf(position);
  return PANEL_POSITIONS[(index + 1) % PANEL_POSITIONS.length] as PanelPosition;
}

export type PanelTabType = "user" | "dev";
export type DevTabType = "chat" | "input" | "map" | "stack" | "history";

export const PANEL_POSITION = {
  LEFT: "left",
  RIGHT: "right",
  BOTTOM: "bottom",
} as const;

export type PanelPosition = (typeof PANEL_POSITIONS)[number];

export const PANEL_POSITIONS = [
  PANEL_POSITION.LEFT,
  PANEL_POSITION.RIGHT,
  PANEL_POSITION.BOTTOM,
] as const;

export const panelVariants = cva(
  "z-999999 flex flex-col w-full max-w-[90vw] sm:max-w-xl",
  {
    variants: {
      position: {
        [PANEL_POSITION.BOTTOM]: "fixed left-1/2 -translate-x-1/2 bottom-6",
        [PANEL_POSITION.LEFT]: "fixed left-6 bottom-6",
        [PANEL_POSITION.RIGHT]: "fixed right-6 bottom-6",
      },
    },
    defaultVariants: {
      position: "bottom",
    },
  },
);

export type PanelProps = VariantProps<typeof panelVariants> & {
  hidden?: boolean;
  url: string;
  className?: string;
};

export function Panel({
  position = "bottom",
  url,
  hidden,
  className,
}: PanelProps): ReactNode {
  const {
    position: positionState,
    isHidden: isHiddenState,
    setIsHidden,
    setStore,
  } = usePanel();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStore({ position, url, isHidden: hidden });
  }, []);

  function handleClickOutside() {
    setIsHidden(true);
  }

  useOnClickOutside(ref as RefObject<HTMLElement>, handleClickOutside);

  return (
    <motion.div
      layout
      ref={ref}
      transition={{
        duration: 0.2,
        ease: "anticipate",
      }}
      className={cn(panelVariants({ position: positionState, className }))}
    >
      <AnimatePresence>
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: isHiddenState ? "calc(100% + 24px)" : 0 }}
          exit={{ y: 0 }}
          transition={{
            duration: 0.2,
            ease: "anticipate",
          }}
        >
          {/* Absolute componnents */}
          <PanelTag />

          {/* Flex-col components */}
          <PanelToast />
          <PanelContent />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
