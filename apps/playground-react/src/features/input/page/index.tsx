import ShikiHighlighter from "react-shiki";
import { InputBasic } from "../components/InputBasic";
import InputBasicRaw from "../components/InputBasic?raw";
import { Button } from "@/components/ui/button";
import { Clipboard, Play } from "lucide-react";
import { useCopyToClipboard } from "usehooks-ts";
import { toast } from "@/components/ui/toast";

function CodeBlock({ raw, code }: { raw: string; code: React.ReactNode }) {
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
      <div className="w-full flex items-center min-h-120">{code}</div>
      <ShikiHighlighter language="jsx" theme="github-dark">
        {raw.trim() || ""}
      </ShikiHighlighter>
      <div className="w-full flex gap-6 justify-end">
        <Button
          variant="outline"
          size="lg"
          className="rounded-full hover:cursor-pointer"
          onClick={handleCopy(InputBasicRaw)}
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

export function InputPage() {
  return (
    <div className="w-full max-w-2xl flex flex-col gap-24">
      <CodeBlock raw={InputBasicRaw} code={<InputBasic />} />
    </div>
  );
}
