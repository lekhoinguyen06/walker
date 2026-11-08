import { usePanel, usePanelHotkeys, usePanelWalk } from "../../hooks";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Menu, Pause } from "lucide-react";
import { PanelSuggest } from "./PanelSuggest";
import { Mouse } from "walker-react";
import { cva } from "class-variance-authority";

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
  const { style, tab, setTab } = usePanel();

  const { handleSubmit, isPending, isWalking } = usePanelWalk();
  const { isMenuHold } = usePanelHotkeys();

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
          onClick={() => handleSubmit()}
        >
          <div
            className={cn(
              !(isWalking || isPending) ? "hidden" : "flex",
              "absolute inset-0 m-auto size-6 aspect-square rounded-full items-center justify-center",
            )}
          >
            <Pause />
          </div>
          <Mouse>
            <div
              className={cn(
                "relative size-6 aspect-square flex items-center justify-center rounded-full",
                isPending && !isWalking && "bg-red-200 text-white",
                isWalking && "bg-red-500 text-white",
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
