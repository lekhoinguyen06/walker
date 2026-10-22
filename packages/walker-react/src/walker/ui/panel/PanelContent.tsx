import {
  usePanel,
  usePanelToast,
  usePanelWalk,
  useRuntime,
  useWalk,
} from "@/walker/hooks";
import { useOnClickOutside } from "usehooks-ts";
import { useMemo, useRef, type RefObject } from "react";
import { useHotkey, useKeyHold } from "@tanstack/react-hotkeys";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Menu, Pause } from "lucide-react";
import { PanelSuggest } from "./PanelSuggest";
import { Mouse } from "../../item";
import { cva } from "class-variance-authority";
import { togglePanelPosition } from "./Panel";
import { usePanelDialog } from "@/walker/hooks/usePanelDialog";
import { useConfig } from "@/walker/hooks/useConfig";

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
  const { isHidden, setIsHidden, style, tab, setTab, position, setPosition } =
    usePanel();
  const { config, setConfig } = useConfig();

  const ref = useRef<HTMLDivElement>(null);
  const { dialog, openDialog, closeDialog } = usePanelDialog();
  const { handleSubmit, isPending, isLooping, isWalking, handleStop } =
    usePanelWalk();
  const { runtime } = useRuntime();
  function handleClickOutside() {
    setIsHidden(true);
  }

  useOnClickOutside(ref as RefObject<HTMLElement>, handleClickOutside);

  useHotkey("W", () => {
    isHidden ? setIsHidden(false) : setIsHidden(true);
  });

  useHotkey(
    "Enter",
    () => {
      handleSubmit();
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey(
    "Space",
    () => {
      const inputElement = document.getElementById("walk-input");
      inputElement?.focus();
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey("Control+C", () => {
    handleStop();
  });

  useHotkey(
    "Tab",
    () => {
      tab ? setTab(null) : setTab("default");
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey(
    "L",
    () => {
      setConfig({ ...config, loop: !config.loop });
      pushToast({
        type: "info",
        message: !config.loop
          ? "Switched to loop mode."
          : "Switched to step mode.",
      });
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey(
    "M",
    () => {
      dialog == "map" ? closeDialog() : openDialog("map");
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey(
    "C",
    () => {
      dialog == "chat" ? closeDialog() : openDialog("chat");
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey(
    "H",
    () => {
      dialog == "history" ? closeDialog() : openDialog("history");
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey(
    "P",
    () => {
      if (position) {
        setPosition(togglePanelPosition(position));
      }
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey(
    "Control+H",
    () => {
      runtime.clear();
      pushToast({
        type: "success",
        message: "Cleared walk history.",
        duration: 1,
      });
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey(
    "Control+/",
    () => {
      dialog == "help" ? closeDialog() : openDialog("help");
    },
    {
      enabled: !isHidden,
    },
  );

  const { pushToast } = usePanelToast();

  const isCtrlHold = useKeyHold("Control");
  const isMHold = useKeyHold("M");
  const isMenuHold = useMemo(
    () => isCtrlHold && isMHold,
    [isCtrlHold, isMHold],
  );

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
          onClick={handleSubmit}
        >
          <div
            className={cn(
              !(isWalking || isPending || isLooping) ? "hidden" : "flex",
              "absolute inset-0 m-auto size-6 aspect-square rounded-full items-center justify-center",
            )}
          >
            <Pause />
          </div>
          <Mouse>
            <div
              className={cn(
                "relative size-6 aspect-square flex items-center justify-center rounded-full",
                (isPending || isLooping) &&
                  !isWalking &&
                  "bg-red-200 text-white",
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
