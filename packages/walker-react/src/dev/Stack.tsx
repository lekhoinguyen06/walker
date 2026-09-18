import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useRuntime } from "@/runtime";
import { Flower2, X } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useScreenSize } from "@/hooks";
import { type FlowType } from "walker-core";
import { Button } from "@/components/ui/button";
import { highlightMarkdownCode, themeCss } from "@/lib/markdown-highlighter";
import { Markdown } from "@tanstack/markdown/react";

export type DialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export function StackPanel({ isOpen, setIsOpen }: DialogProps) {
  const { runtime } = useRuntime();
  const { isMobile } = useScreenSize();
  const [selectedFlow, setSelectedFlow] = useState<
    Pick<FlowType, "command" | "description"> | undefined
  >(undefined);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-none sm:max-w-none max-h-none w-[80vw] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-brand">Stack</DialogTitle>
          <DialogDescription>
            <span className="text-xs">View your app's current flows.</span>
          </DialogDescription>
          <div className=" flex w-full h-[60vh] border rounded-[12px]">
            <div
              className={cn(
                "w-full p-3 overflow-scroll",
                selectedFlow && isMobile && "hidden",
              )}
            >
              {runtime.listFlows().map((f) => (
                <div
                  className={cn(
                    "w-full flex gap-3 items-center hover:bg-accent hover:cursor-pointer",
                    selectedFlow?.command === f.command && "bg-accent",
                  )}
                  onClick={() => setSelectedFlow(f)}
                >
                  <Flower2 size={12} />
                  <span className="text-xs font-semibold text-nowrap">
                    {f.command}
                  </span>
                  <span className="text-xs text-nowrap">{f.description}</span>
                </div>
              ))}
            </div>
            {selectedFlow && (
              <div className="relative w-full sm:min-w-[40vw] min-w-full flex flex-col p-3 gap-3 sm:border-l overflow-scroll">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1.5 right-1.5"
                  onClick={() => setSelectedFlow(undefined)}
                >
                  <X />
                </Button>
                <div className="font-brand">Details</div>
                {Object.entries(selectedFlow).map(([key, value]) => {
                  if (key === "schema") {
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
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
