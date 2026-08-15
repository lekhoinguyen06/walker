import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Clipboard, Play } from "lucide-react";
import { useCopyToClipboard, useDarkMode } from "usehooks-ts";
import { toast } from "@/components/ui/toast";
import { useState } from "react";
import { Markdown } from "@tanstack/markdown/react";
import { createThemeCss } from "@tanstack/highlight/theme";
import { githubDarkTheme } from "@tanstack/highlight/themes/github-dark";
import { githubLightTheme } from "@tanstack/highlight/themes/github-light";
import { highlightMarkdownCode } from "@/lib/markdown-highlighter";
import { cn } from "@/lib/utils";

const themeCss = createThemeCss({
  light: githubLightTheme,
  dark: githubDarkTheme,
  lightSelector: ".markdown-renderer",
  darkSelector: ".dark .markdown-renderer",
  codeBlockSelector: ".markdown-renderer pre.tm-code",
  lineNumbersSelector: ".markdown-renderer .tm-code--line-numbers",
});

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
