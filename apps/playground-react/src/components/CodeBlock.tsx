import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Clipboard, Play } from "lucide-react";
import { useCopyToClipboard } from "usehooks-ts";
import { toast } from "@/components/ui/toast";
import { useState } from "react";
import { Markdown } from "@tanstack/markdown/react";
import { highlightMarkdownCode, themeCss } from "@/lib/markdown-highlighter";
import { cn } from "@/lib/utils";

export function CodeBlock({
  raw,
  code,
}: {
  raw: string;
  code?: React.ReactNode;
}) {
  const [_, copy] = useCopyToClipboard();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        toast.add({
          type: "success",
          title: "Copied to clipboard",
          timeout: 2000,
        });
      })
      .catch((error) => {
        console.error("Failed to copy", error);
        toast.add({
          type: "error",
          title: "Failed to copy",
          timeout: 2000,
        });
      });
  };

  const source = ["```tsx {2}", raw.trim(), "```"].join("\n");

  return (
    <div className="w-[90vw] sm:w-[80vw] max-w-2xl flex flex-col gap-6 p-6 rounded-[24px] border">
      {code && (
        <div className="w-full flex items-center justify-center min-h-120">
          {code}
        </div>
      )}
      <div className="w-full relative">
        <div
          className={cn(
            "markdown-renderer",
            isExpanded ? "max-h-full" : "max-h-120 overflow-scroll",
          )}
        >
          <style>{themeCss}</style>
          <Markdown highlighter={highlightMarkdownCode}>{source}</Markdown>
          <div className="absolute top-0 right-0 flex gap-1">
            <Button
              variant="ghost"
              size="lg"
              className="hover:cursor-pointer"
              onClick={handleCopy(raw.trim())}
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
          </div>
        </div>
      </div>
      <div className="w-full flex gap-6 justify-end">
        <Button
          variant="outline"
          size="lg"
          className="rounded-full hover:cursor-pointer"
        >
          <Play />
          Run
        </Button>
      </div>
    </div>
  );
}
