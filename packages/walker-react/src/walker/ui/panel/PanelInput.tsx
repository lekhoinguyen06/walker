import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export type PanelInputProps = {
  input: string;
  setInput: (input: string) => void;
  onSubmit?: () => void;
};

export function PanelInput({
  input,
  setInput,
  onSubmit,
  ...props
}: PanelInputProps) {
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
        onSubmit?.();
      }}
    />
  );
}
