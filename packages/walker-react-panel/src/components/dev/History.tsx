import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Details } from "./Details";
import { PanelDialog } from "../panel/PanelDialog";
import { usePanelDialog } from "@/hooks";
import { useHistory } from "walker-react";
import type { HistoryItemType } from "walker-shared";

export function HistoryDialog() {
  const { closeDialog } = usePanelDialog();
  const { history } = useHistory();
  console.log("history", history);
  const [selectedHistory, setSelectedHistory] = useState<
    HistoryItemType | undefined
  >(undefined);
  return (
    <PanelDialog dialog={"history"}>
      <div className="size-full">
        <div className="flex flex-col w-full h-120 bg-black border border-white rounded-[24px] overflow-hidden">
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
                    <ChevronLeft />
                  </Button>
                  <Details item={selectedHistory} />
                </>
              ) : (
                <div>
                  {history.map((i) => (
                    <div
                      className={cn(
                        "w-full flex gap-3 items-center hover:bg-accent hover:cursor-pointer",
                      )}
                      onClick={() => setSelectedHistory(i)}
                    >
                      <span className="text-xs font-semibold text-nowrap">
                        {i.action.flowCommand}
                      </span>
                      <span className="text-xs text-nowrap">
                        {i.userPrompt}
                      </span>
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
