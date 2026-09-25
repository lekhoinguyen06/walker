import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Clipboard } from "lucide-react";
import { useCopyToClipboard } from "usehooks-ts";
import { useState } from "react";
import { Markdown } from "@tanstack/markdown/react";
import { highlightMarkdownCode, themeCss } from "@/lib/markdown-highlighter";
import { cn } from "@/lib/utils";
import { usePanelToast, useRuntime } from "walker-react";

export type RawCode = {
  lang: "tsx" | "json";
  content: string;
};

type CodeContentProps = {
  raw: RawCode;
};

export function CodeContent({ raw }: CodeContentProps) {
  const [_, copy] = useCopyToClipboard();
  const [isExpanded, setIsExpanded] = useState(false);
  const source = ["```" + raw.lang.trim(), raw.content.trim(), "```"].join(
    "\n",
  );
  const { runtime } = useRuntime();
  const { pushToast } = usePanelToast();

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        pushToast({
          message: "Copied to clipboard",
          type: "info",
        });
      })
      .catch(() => {
        pushToast({
          message: "Failed to copy",
          type: "error",
        });
      });
  };
  return (
    <div className="w-full relative">
      <div
        className={cn(
          "overflow-auto scrollbar-none",
          isExpanded ? "max-h-full" : "max-h-120",
        )}
      >
        <div className="markdown-renderer w-fit">
          <style>{themeCss}</style>
          <Markdown highlighter={highlightMarkdownCode}>{source}</Markdown>
        </div>
        <div className="absolute top-0 right-0 flex gap-1">
          <Button
            variant="ghost"
            size="lg"
            className="hover:cursor-pointer"
            onClick={handleCopy(raw.content.trim())}
          >
            <Clipboard />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="hover:cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ArrowUp /> : <ArrowDown />}
          </Button>
          <Button
            variant="default"
            size="lg"
            className={cn(
              "hover:cursor-pointer rounded-none bg-foreground text-white dark:text-black",
              raw.lang !== "json" && "hidden",
            )}
            onClick={() => {
              try {
                runtime.addRawActions(raw.content.trim());
                pushToast({
                  type: "info",
                  message: "Walk loaded. Press key Ctrl + W to start the walk.",
                });
              } catch (error) {
                console.error(error);
                pushToast({
                  type: "error",
                  message: "Failed to load walk",
                });
              }
            }}
          >
            <span className="font-brand">W</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function CodeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[90vw] sm:w-[80vw] max-w-2xl flex flex-col gap-6 p-6 rounded-[24px] border">
      {children}
    </div>
  );
}

export function CodeDemo({ component }: { component: React.ReactNode }) {
  return (
    <div className="w-full flex items-center justify-center min-h-120">
      {component}
    </div>
  );
}
