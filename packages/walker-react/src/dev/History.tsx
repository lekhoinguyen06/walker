import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { highlightMarkdownCode, themeCss } from "@/lib/markdown-highlighter";
import { useRuntime } from "@/RuntimeProvider";
import { Markdown } from "@tanstack/markdown/react";
import type { Dispatch, SetStateAction } from "react";

export type HistoryProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export function HistoryPanel({ isOpen, setIsOpen }: HistoryProps) {
  const { runtime } = useRuntime();
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
          <div className="markdown-renderer typeset first:*:mt-0">
            <style>{themeCss}</style>
            <Markdown highlighter={highlightMarkdownCode}>
              {"```json\n" +
                JSON.stringify(runtime.listHistory(), null, 2) +
                "\n```"}
            </Markdown>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
