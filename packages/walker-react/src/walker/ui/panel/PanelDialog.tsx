import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { usePanelDialog } from "@/walker/hooks/usePanelDialog";
import { MapDialog } from "../dev/Map";
import { HistoryDialog } from "../dev/History";
import { ChatDialog } from "../dev/Chat";
import { cn } from "@/lib/utils";
import { PanelHelp } from "./PanelHelp";

export function PanelDialogContainter() {
  const { dialog } = usePanelDialog();
  return (
    <div className={cn(dialog && "mb-1.5")}>
      <AnimatePresence>
        {dialog == "map" && <MapDialog />}
        {dialog == "history" && <HistoryDialog />}
        {dialog == "chat" && <ChatDialog />}
        {dialog == "help" && <PanelHelp />}
      </AnimatePresence>
    </div>
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
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: "auto",
        opacity: 1,
      }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.2, type: "keyframes" }}
      className={"flex flex-col bg-primary rounded-[24px] overflow-hidden"}
    >
      {children}
    </motion.div>
  );
}
