import { useState, type Dispatch, type SetStateAction } from "react";
import type { HistoryType } from "walker-core";
import { cn } from "@/lib/utils";
import { GalleryHorizontalEnd, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRuntime, useScreenSize } from "@/walker/hooks";
import { Details } from "./Details";
import { PanelDialog } from "../panel/PanelDialog";
import {
  PANEL_DIALOG_REGISTRY,
  usePanelDialog,
} from "@/walker/hooks/usePanelDialog";

export type HistoryProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export function HistoryDialog() {
  const { closeDialog } = usePanelDialog();
  const { runtime } = useRuntime();
  const { isMobile } = useScreenSize();
  const [selectedHistory, setSelectedHistory] = useState<
    HistoryType | undefined
  >(undefined);
  return (
    <PanelDialog dialog={PANEL_DIALOG_REGISTRY.history}>
      <div className="size-full p-1.5">
        <div className="flex flex-col w-full h-120 bg-white dark:bg-black rounded-[16px] overflow-hidden">
          <div className="w-full p-3">
            <div className="font-brand">History</div>
            <div className="text-xs">View your walks' history.</div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3"
              onClick={closeDialog}
            >
              <X />
            </Button>
          </div>
          <div className="flex size-full overflow-hidden">
            <div className="relative size-full flex flex-col p-3 gap-3 overflow-scroll scrollbar-none">
              {selectedHistory ? (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1.5 right-1.5"
                    onClick={() => setSelectedHistory(undefined)}
                  >
                    <X />
                  </Button>
                  <Details item={selectedHistory} />
                </>
              ) : (
                <div>
                  {runtime.listHistory().map((i) => (
                    <div
                      className={cn(
                        "w-full flex gap-3 items-center hover:bg-accent hover:cursor-pointer",
                        // selectedHistory?. === f.command && "bg-accent",
                      )}
                      onClick={() => setSelectedHistory(i)}
                    >
                      <GalleryHorizontalEnd size={12} />
                      <span className="text-xs font-semibold text-nowrap">
                        {i.action.flow}
                      </span>
                      <span className="text-xs text-nowrap">{i.prompt}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PanelDialog>
  );
}
