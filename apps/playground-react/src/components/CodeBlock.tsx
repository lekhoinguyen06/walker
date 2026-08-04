import { Button } from "@/components/ui/button";
import { Clipboard, Play } from "lucide-react";
import { useCopyToClipboard, useDarkMode } from "usehooks-ts";
import { toast } from "@/components/ui/toast";
import ShikiHighlighter from "react-shiki";
import { useState } from "react";

export function CodeBlock({
  raw,
  code,
}: {
  raw: string;
  code?: React.ReactNode;
}) {
  const { isDarkMode } = useDarkMode();
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

  return (
    <div className="w-full max-w-2xl flex flex-col gap-6 p-6 rounded-[24px] border">
      {code && (
        <div className="w-full flex items-center justify-center min-h-120">
          {code}
        </div>
      )}
      <div
        className={`sm:block hidden overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-none" : "max-h-100"
        }`}
      >
        <ShikiHighlighter
          language="jsx"
          theme={isDarkMode ? "github-dark" : "github-light"}
        >
          {raw.trim() || ""}
        </ShikiHighlighter>
      </div>
      <div className="w-full flex gap-6 justify-end">
        <Button
          variant="outline"
          size="lg"
          className="rounded-full hover:cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show Less" : "Show More"}
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="rounded-full hover:cursor-pointer"
          onClick={handleCopy(raw.trim())}
        >
          <Clipboard />
          Copy
        </Button>
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
