import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { highlightMarkdownCode, themeCss } from "@/lib/markdown-highlighter";
import { Markdown } from "@tanstack/markdown/react";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { HistoryType } from "walker-core";
import { cn } from "@/lib/utils";
import { GalleryHorizontalEnd, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRuntime } from "@/hooks/useRuntime";
import { useScreenSize } from "@/shared/hooks/useScreenSize";

export type HistoryProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export function HistoryPanel({ isOpen, setIsOpen }: HistoryProps) {
  const { runtime } = useRuntime();
  const { isMobile } = useScreenSize();
  const [selectedHistory, setSelectedHistory] = useState<
    HistoryType | undefined
  >(undefined);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-none sm:max-w-none max-h-none w-[80vw] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-brand">History</DialogTitle>
          <DialogDescription>
            <span className="text-xs">View your walks' history.</span>
          </DialogDescription>
        </DialogHeader>
        <div className=" flex w-full h-[60vh] border rounded-[12px]">
          <div
            className={cn(
              "w-full p-3 overflow-scroll",
              selectedHistory && isMobile && "hidden",
            )}
          >
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
          {selectedHistory && (
            <div className="relative w-full sm:min-w-[40vw] min-w-full flex flex-col p-3 gap-3 sm:border-l overflow-scroll">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1.5 right-1.5"
                onClick={() => setSelectedHistory(undefined)}
              >
                <X />
              </Button>
              <div className="font-brand">Details</div>
              {Object.entries(selectedHistory).map(([key, value]) => {
                if (key === "flow" || key === "action" || key === "map") {
                  return (
                    <div key={key}>
                      <div className="text-xs font-light">{key}</div>
                      <div className="markdown-renderer max-h-60 overflow-y-scroll">
                        <style>{themeCss}</style>
                        <Markdown highlighter={highlightMarkdownCode}>
                          {"```json\n" +
                            JSON.stringify(value, null, 2) +
                            "\n```"}
                        </Markdown>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={key}>
                      <div className="text-xs font-light">{key}</div>
                      <div className="text-sm">{String(value)}</div>
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
