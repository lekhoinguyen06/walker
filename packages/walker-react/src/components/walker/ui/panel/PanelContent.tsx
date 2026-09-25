import { useWalk, useWalkerInput } from "@/hooks";
import { useOnClickOutside } from "usehooks-ts";
import { useMemo, useRef, type RefObject } from "react";
import { useHotkey, useKeyHold } from "@tanstack/react-hotkeys";
import { usePanelToast } from "@/hooks";
import { generateWalkPrompt } from "@/utils/prompt";
import { cn } from "cn";
import { PanelPopup } from "./PanelPopup";
import { UserMenu } from "./UserMenu";
import { DevMenu } from "./DevMenu";
import { PanelInput } from "./PanelInput";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { PanelSuggest } from "./PanelSuggest";
import { Mouse } from "../../item";
import { cva } from "class-variance-authority";
import { usePanel } from "@/hooks";

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

export function PanelContent({ className }: { className?: string }) {
  const {
    isHidden,
    setIsHidden,
    url,
    style,
    tab,
    openTab,
    closeTab,
    switchTab,
  } = usePanel();

  const { input, setInput } = useWalkerInput();
  const ref = useRef<HTMLDivElement>(null);
  const { submit, isLoading, actionsInQueueCount, isWalking, runtime, walk } =
    useWalk({
      url,
    });
  function handleClickOutside() {
    setIsHidden(true);
  }

  useOnClickOutside(ref as RefObject<HTMLElement>, handleClickOutside);

  useHotkey("Control+P", () => {
    setIsHidden(!isHidden);
  });

  useHotkey(
    "Control+W",
    () => {
      handleSubmit();
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey(
    "Control+M",
    () => {
      tab ? closeTab() : openTab();
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey(
    "Tab",
    () => {
      if (tab === "dev") {
        switchTab("user");
      } else {
        switchTab("dev");
      }
    },
    {
      enabled: !isHidden,
    },
  );

  const { pushToast } = usePanelToast();

  const handleSubmit = () => {
    if (actionsInQueueCount === 0 && !isLoading && !isWalking) {
      if (input.trim() === "") {
        pushToast({
          type: "info",
          message: "Input is empty, please instruct Walker.",
        });
        return;
      }
      submit({
        input,
        prompt: generateWalkPrompt(runtime, input),
      });
    } else {
      pushToast({
        type: "info",
        message: "Manual walk",
      });
      walk();
    }
  };

  const isCtrlHold = useKeyHold("Control");
  const isMHold = useKeyHold("M");
  const isMenuHold = useMemo(
    () => isCtrlHold && isMHold,
    [isCtrlHold, isMHold],
  );

  return (
    <div className={cn(panelContentVariants({ style, className }))}>
      <PanelPopup
        selectedTab={tab}
        tabs={{
          user: <UserMenu onDev={() => switchTab("dev")} />,
          dev: <DevMenu onReturn={() => switchTab("user")} />,
        }}
      ></PanelPopup>
      <PanelInput input={input} setInput={setInput} onSubmit={handleSubmit} />
      <div className="w-full flex gap-1.5">
        <Button
          variant="ghost"
          size="icon"
          className={cn("rounded-full", isMenuHold && "bg-accent")}
          onClick={() => (tab ? closeTab() : openTab())}
        >
          <Menu />
        </Button>
        <PanelSuggest />
        <Mouse>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full",
              isLoading && "bg-accent text-black",
              isWalking && "bg-red-500 text-white",
            )}
            onClick={handleSubmit}
          >
            <span className="font-brand">W</span>
          </Button>
        </Mouse>
      </div>
    </div>
  );
}
