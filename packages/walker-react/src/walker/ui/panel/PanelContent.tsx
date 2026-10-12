import {
  usePanel,
  usePanelToast,
  useRuntime,
  useWalk,
  useWalkerInput,
} from "@/walker/hooks";
import { useOnClickOutside } from "usehooks-ts";
import { useMemo, useRef, type RefObject } from "react";
import {
  useHotkey,
  useHotkeySequence,
  useKeyHold,
} from "@tanstack/react-hotkeys";
import { cn } from "cn";
import { PanelPopup } from "./PanelPopup";
import { PanelInput } from "./PanelInput";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { PanelSuggest } from "./PanelSuggest";
import { Mouse } from "../../item";
import { cva } from "class-variance-authority";
import { PanelMenu } from "./PanelMenu";
import { togglePanelPosition } from "./Panel";

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
};

export function PanelContent({ className }: PanelContentProps) {
  const {
    isHidden,
    setIsHidden,
    url,
    style,
    tab,
    setTab,
    modal,
    setModal,
    position,
    setPosition,
  } = usePanel();

  const { input, setInput } = useWalkerInput();
  const ref = useRef<HTMLDivElement>(null);
  const { actionsInQueueCount, walk, isWalking, setConfig, config, runtime } =
    useRuntime();
  const { mutate, isPending, start, isLooping } = useWalk({
    url,
  });
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
      modal == "map" ? setModal(null) : setModal("map");
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey(
    "C",
    () => {
      modal == "chat" ? setModal(null) : setModal("chat");
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey(
    "H",
    () => {
      modal == "history" ? setModal(null) : setModal("history");
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

  const { pushToast } = usePanelToast();

  const handleSubmit = () => {
    console.log("PanelContent handleSubmit");
    if (actionsInQueueCount === 0 && !isPending && !isWalking) {
      if (input.trim() === "") {
        pushToast({
          type: "info",
          message: "Input is empty, please instruct Walker.",
        });
        return;
      }
      start();
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
      <PanelInput input={input} setInput={setInput} onSubmit={handleSubmit} />
      <PanelPopup
        selectedTab={tab}
        tabs={{
          default: <PanelMenu />,
        }}
      ></PanelPopup>
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
        <Mouse>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full",
              (isPending || isLooping) &&
                !isWalking &&
                "bg-gray-200 text-black",
              isLooping && "animate-pulse",
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
