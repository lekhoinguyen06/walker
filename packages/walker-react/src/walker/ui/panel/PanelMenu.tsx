import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePanel, usePanelToast, useRuntime } from "@/walker/hooks";
import {
  CircleQuestionMark,
  Footprints,
  History,
  Map,
  MessageCircle,
  PanelBottom,
  RefreshCcw,
} from "lucide-react";
import { togglePanelPosition } from "./Panel";
import { usePanelDialog } from "@/walker/hooks/usePanelDialog";

export function PanelMenu() {
  const { modal, setModal, position, setPosition } = usePanel();
  const { openDialog, closeDialog, dialog } = usePanelDialog();
  const { pushToast } = usePanelToast();
  const { runtime, config, setConfig } = useRuntime();
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className={cn("rounded-full", config.loop && "bg-accent text-primary")}
        onClick={() => {
          setConfig({ ...config, loop: !config.loop });
          pushToast({
            type: "info",
            message: !config.loop
              ? "Switched to loop mode."
              : "Switched to step mode.",
          });
        }}
      >
        <Footprints />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={() => {
          if (position) {
            setPosition(togglePanelPosition(position));
          }
        }}
      >
        <PanelBottom />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={() => {
          runtime.clear();
          pushToast({
            type: "success",
            message: "Cleared walk history.",
            duration: 1,
          });
        }}
      >
        <RefreshCcw />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={() => (dialog == "chat" ? closeDialog() : openDialog("chat"))}
      >
        <MessageCircle />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={() => (dialog == "map" ? closeDialog() : openDialog("map"))}
      >
        <Map />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={() =>
          dialog == "history" ? closeDialog() : openDialog("history")
        }
      >
        <History />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={() => (dialog == "help" ? closeDialog() : openDialog("help"))}
      >
        <CircleQuestionMark />
      </Button>
    </>
  );
}
