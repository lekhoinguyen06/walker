import { Button } from "@/components/ui/button";
import { Clipboard, Play } from "lucide-react";
import { useCopyToClipboard } from "usehooks-ts";
import { toast } from "@/components/ui/toast";
import ShikiHighlighter from "react-shiki";

export function CodeBlock({
  raw,
  code,
}: {
  raw: string;
  code: React.ReactNode;
}) {
  const [_, copy] = useCopyToClipboard();

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
    <div className="w-full max-w-xl flex flex-col gap-6 p-6 rounded-[24px] border">
      <div className="w-full flex items-center justify-center min-h-120">
        {code}
      </div>
      <ShikiHighlighter language="jsx" theme="github-dark">
        {raw.trim() || ""}
      </ShikiHighlighter>
      <div className="w-full flex gap-6 justify-end">
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
