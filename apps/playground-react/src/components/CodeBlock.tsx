import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Clipboard } from "lucide-react";
import { useCopyToClipboard } from "usehooks-ts";
import { toast } from "@/components/ui/toast";
import { useState } from "react";
import { Markdown } from "@tanstack/markdown/react";
import { highlightMarkdownCode, themeCss } from "@/lib/markdown-highlighter";
import { cn } from "@/lib/utils";
import { useRuntime } from "@walker/react";

export type RawCode = {
  lang: "tsx" | "json";
  content: string;
};

type CodeProps = {
  raw: RawCode;
};

function Code({ raw }: CodeProps) {
  const [_, copy] = useCopyToClipboard();
  const [isExpanded, setIsExpanded] = useState(false);
  const source = ["```" + raw.lang.trim(), raw.content.trim(), "```"].join(
    "\n",
  );
  const { runtime } = useRuntime();

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
  return (
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
                runtime.rawWalk(raw.content.trim());
                toast.add({
                  type: "success",
                  title: "Walk loaded. Press key 0 to start the walk.",
                  timeout: 2000,
                });
              } catch (error) {
                console.error("Failed to execute rawWalk", error);
                toast.add({
                  type: "error",
                  title: "Failed to load walk",
                  timeout: 2000,
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

export function CodeBlock({
  raw,
  code,
}: {
  raw: RawCode[];
  code?: React.ReactNode;
}) {
  return (
    <div className="w-[90vw] sm:w-[80vw] max-w-2xl flex flex-col gap-6 p-6 rounded-[24px] border">
      {code && (
        <div className="w-full flex items-center justify-center min-h-120">
          {code}
        </div>
      )}
      {raw.map((item, index) => (
        <Code key={index} raw={item} />
      ))}
    </div>
  );
}
