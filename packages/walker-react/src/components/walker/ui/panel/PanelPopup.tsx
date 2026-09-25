import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { cn } from "@/lib/utils";
import type { PanelTabType } from "./Panel";

type PanelPopupProps = {
  selectedTab?: PanelTabType;
  tabs: { [key in PanelTabType]: React.ReactNode };
  children?: React.ReactNode;
};

export function PanelPopup({ selectedTab, tabs }: PanelPopupProps) {
  return (
    <motion.div
      initial={{ marginBottom: -6 }}
      animate={{
        marginBottom: selectedTab ? 0 : -6,
      }}
      transition={{ duration: 0.2 }}
    >
      <AnimatePresence>
        {selectedTab && (
          <motion.div
            className={cn("w-full flex items-center overflow-hidden")}
            key={selectedTab}
            initial={{ y: "100%", height: 0, opacity: 0 }}
            animate={{
              y: 0,
              height: "auto",
              opacity: 1,
            }}
            exit={{ y: "-100%", height: 0, opacity: 0 }}
            transition={{ duration: 0.2, type: "keyframes" }}
          >
            {tabs[selectedTab]}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
