import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { usePanelDialog } from "@/walker/hooks/usePanelDialog";
import { MapDialog } from "../dev/Map";
import { HistoryDialog } from "../dev/History";

export function PanelDialogContainter() {
  const { dialog } = usePanelDialog();
  return (
    <AnimatePresence>
      {dialog == "map" && <MapDialog />}
      {dialog == "history" && <HistoryDialog />}
    </AnimatePresence>
  );
}

export function PanelDialog({
  dialog,
  children,
}: {
  dialog: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      key={dialog}
      initial={{ y: "100%", height: 0, opacity: 0 }}
      animate={{
        y: 0,
        height: "auto",
        opacity: 1,
      }}
      exit={{ y: "100%", height: 0, opacity: 0 }}
      transition={{ duration: 0.4, type: "spring" }}
      className={"flex flex-col bg-primary rounded-[24px] overflow-hidden"}
    >
      {children}
    </motion.div>
  );
}
