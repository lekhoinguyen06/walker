import { Textarea } from "@/components/ui/textarea";
import { usePanel, usePanelToast } from "@/hooks";
import { cn } from "@/lib/utils";
import { panelContextFactory } from "@/lib/walker";
import { useEffect, useState } from "react";
import { useWalk } from "walker-react";

type PanelInputProps = {
  className?: string;
};

export function PanelInput({ className }: PanelInputProps) {
  const { context, setContext } = usePanel();
  const { mutate } = useWalk();
  const { pushToast } = usePanelToast();
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
        setContext({ ...context, userPrompt: e.target.value });
      }}
      onKeyDown={(e) => {
        if (e.key !== "Enter") return;

        if (e.shiftKey) {
          return;
        }

        e.preventDefault();
        mutate(context);
      }}
    />
  );
}
