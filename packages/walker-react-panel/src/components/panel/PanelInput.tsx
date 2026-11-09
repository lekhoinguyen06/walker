import { Textarea } from "@/components/ui/textarea";
import { usePanel } from "@/hooks";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { webFlows } from "walker-dom";
import { useWalk } from "walker-react";

type PanelInputProps = {
  className?: string;
};

export function PanelInput({ className }: PanelInputProps) {
  const { context, setUserPrompt } = usePanel();
  const { mutate } = useWalk();
  const [isExpanding, setIsExpanding] = useState(false);
  const isTooLong = context.userPrompt.length > 50;
  const isNewLine = context.userPrompt.includes("\n");

  useEffect(() => {
    setIsExpanding(isTooLong || isNewLine);
  }, [context.userPrompt]);

  return (
    <Textarea
      id="walk-input"
      placeholder="Let's take a walk"
      className={cn(
        "w-full min-h-none h-8 py-1 rounded-[16px] bg-background text-black resize-none shrink-0 scrollbar-none",
        isExpanding && "h-16 rounded-[16px]",
        className,
      )}
      value={context.userPrompt}
      onChange={(e) => {
        setUserPrompt(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key !== "Enter") return;

        if (e.shiftKey) {
          return;
        }

        e.preventDefault();
        mutate({
          userPrompt: context.userPrompt,
          flows: webFlows,
        });
      }}
    />
  );
}
