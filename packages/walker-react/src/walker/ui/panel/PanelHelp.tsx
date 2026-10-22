import { usePanelDialog } from "@/walker/hooks/usePanelDialog";
import { PanelDialog } from "./PanelDialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Kbd } from "@/components/ui/kbd";

export function PanelHelp() {
  const { closeDialog } = usePanelDialog();
  return (
    <PanelDialog dialog={"help"}>
      <div className="size-full p-1.5">
        <div className="flex flex-col w-full h-120 bg-white dark:bg-black rounded-[16px] overflow-hidden">
          <div className="w-full p-3">
            <div className="font-brand">Help</div>
            <div className="text-xs">Understand The Walker Way</div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3"
              onClick={closeDialog}
            >
              <X />
            </Button>
          </div>
          <div className="flex flex-col size-full p-3 gap-3 overflow-hidden">
            <div className="flex items-center gap-3">
              <Kbd>W</Kbd>
              <span>Toggle Walker panel</span>
            </div>
            <div className="flex items-center gap-3">
              <Kbd>Enter</Kbd>
              <span>Walk</span>
            </div>
            <div className="flex items-center gap-3">
              <Kbd>Space</Kbd>
              <span>Focus input</span>
            </div>
            <div className="flex items-center gap-3">
              <Kbd>Tab</Kbd>
              <span>Open menu</span>
            </div>
            <div className="flex items-center gap-3">
              <Kbd>L</Kbd>
              <span>Toggle step or loop mode</span>
            </div>
            <div className="flex items-center gap-3">
              <Kbd>Control</Kbd>+<Kbd>C</Kbd>
              <span>Stop the current looping walk</span>
            </div>
            <div className="flex items-center gap-3">
              <Kbd>H</Kbd>
              <span>Open history dialog</span>
            </div>
            <div className="flex items-center gap-3">
              <Kbd>C</Kbd>
              <span>Open chat dialog</span>
            </div>
            <div className="flex items-center gap-3">
              <Kbd>M</Kbd>
              <span>Open map dialog</span>
            </div>
            <div className="flex items-center gap-3">
              <Kbd>Control</Kbd>+<Kbd>H</Kbd>
              <span>Clear walk history</span>
            </div>
            <div className="flex items-center gap-3">
              <Kbd>Control</Kbd>+<Kbd>/</Kbd>
              <span>Open help</span>
            </div>
          </div>
        </div>
      </div>
    </PanelDialog>
  );
}
