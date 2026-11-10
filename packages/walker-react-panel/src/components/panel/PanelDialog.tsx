import { AnimatePresence, motion } from "motion/react";
import { MapDialog } from "../dev/Map";
import { HistoryDialog } from "../dev/History";
import { ChatDialog } from "../dev/Chat";
import { cn } from "@/lib/utils";
import { PanelHelp } from "./PanelHelp";
import { InputDialog } from "../dev/Input";
import { usePanelDialog } from "@/hooks";
import type { PanelDialogType } from "@/constants/panel.const";

export function PanelDialogContainter() {
  const { dialog } = usePanelDialog();
  return (
    <div className={cn(dialog && "mb-1.5")}>
      <AnimatePresence>
        {dialog == "map" && <MapDialog />}
        {dialog == "history" && <HistoryDialog />}
        {dialog == "chat" && <ChatDialog />}
        {dialog == "help" && <PanelHelp />}
        {dialog == "input" && <InputDialog />}
      </AnimatePresence>
    </div>
  );
}

export function PanelDialog({
  dialog,
  children,
}: {
  dialog: PanelDialogType;
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
