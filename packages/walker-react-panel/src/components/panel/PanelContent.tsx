import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Menu, Pause } from "lucide-react";
import { PanelSuggest } from "./PanelSuggest";
import { cva } from "class-variance-authority";
import { usePanel, usePanelHotkeys, usePanelToast } from "@/hooks";
import { Mouse, useWalk } from "walker-react";
import { webFlows } from "walker-dom";
import { panelFlowsFactory } from "@/lib/walker";

export const panelContentVariants = cva(
  "relative flex flex-col w-full p-1.5 gap-1.5 rounded-[24px] shadow-2xl",
  {
    variants: {
      style: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        glass: "bg-background/80 text-foreground backdrop-blur-md",
      },
    },
    defaultVariants: {
      style: "primary",
    },
  },
);

type PanelContentProps = {
  className?: string;
  children?: React.ReactNode;
};

export function PanelContent({ className, children }: PanelContentProps) {
  const { style, tab, setTab, context } = usePanel();
  const { isMenuHold } = usePanelHotkeys();
  const { mutate, loading, data } = useWalk();
  const { pushToast } = usePanelToast();

  return (
    <div className={cn(panelContentVariants({ style, className }))}>
      {children}
      <div className="w-full flex gap-1.5">
        <Button
          variant="ghost"
          size="icon"
          className={cn("rounded-full", isMenuHold && "bg-accent")}
          onClick={() => (tab ? setTab(null) : setTab("default"))}
        >
          <Menu />
        </Button>
        <PanelSuggest />
        <Button
          variant="ghost"
          size="icon"
          className={"rounded-full relative"}
          onClick={() =>
            mutate({
              userPrompt: context.userPrompt,
              flows: panelFlowsFactory({
                pushToast,
              }),
            })
          }
        >
          <div
            className={cn(
              !loading ? "hidden" : "flex",
              "absolute inset-0 m-auto size-6 aspect-square rounded-full items-center justify-center",
            )}
          >
            <Pause />
          </div>
          <Mouse>
            <div
              className={cn(
                "relative size-6 aspect-square flex items-center justify-center rounded-full",
                loading && "bg-red-500 text-white",
              )}
            >
              <div className="font-brand text-lg">W</div>
            </div>
          </Mouse>
        </Button>
      </div>
    </div>
  );
}
