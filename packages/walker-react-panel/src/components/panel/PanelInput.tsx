import { Textarea } from "@/components/ui/textarea";
import { usePanel, usePanelToast } from "@/hooks";
import { cn } from "@/lib/utils";
import { panelContextFactory } from "@/lib/walker";
import { useEffect, useState } from "react";
import { useUser, useWalk } from "walker-react";

type PanelInputProps = {
  className?: string;
};

export function PanelInput({ className }: PanelInputProps) {
  const { context, setContext } = usePanel();
  const { mutate } = useWalk();
  const { user, setUserPrompt } = useUser();
  const [isExpanding, setIsExpanding] = useState(false);
  const isTooLong = user.prompt.length > 20;
  const isNewLine = user.prompt.includes("\n");

  useEffect(() => {
    setIsExpanding(isTooLong || isNewLine);
  }, [user.prompt]);

  return (
    <Textarea
      id="walk-input"
      placeholder="Let's take a walk"
      className={cn(
        "w-full min-h-none h-8 py-1 rounded-[16px] bg-background text-black resize-none shrink-0 scrollbar-none",
        isExpanding && "h-16 rounded-[16px]",
        className,
      )}
      value={user.prompt}
      onChange={(e) => {
        setUserPrompt(e.target.value);
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
