import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { usePanelWalk, useWalk, useWalkerInput } from "@/walker/hooks";
import { useEffect, useState } from "react";

type PanelInputProps = {
  className?: string;
};

export function PanelInput({ className }: PanelInputProps) {
  const { input, setInput } = useWalkerInput();
  const { handleSubmit } = usePanelWalk();
  const [isExpanding, setIsExpanding] = useState(false);
  const isTooLong = input.length > 50;
  const isNewLine = input.includes("\n");

  useEffect(() => {
    setIsExpanding(isTooLong || isNewLine);
  }, [input]);

  return (
    <Textarea
      id="walk-input"
      placeholder="Let's take a walk"
      className={cn(
        "w-full min-h-none h-8 py-1 rounded-[16px] bg-background text-black resize-none shrink-0 scrollbar-none",
        isExpanding && "h-16 rounded-[16px]",
        className,
      )}
      value={input}
      onChange={(e) => {
        setInput(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key !== "Enter") return;

        if (e.shiftKey) {
          return;
        }

        e.preventDefault();
        handleSubmit();
      }}
    />
  );
}
