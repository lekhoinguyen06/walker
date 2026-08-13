import {
  Braces,
  Brackets,
  CodeXml,
  Layers,
  Pause,
  Play,
  Trash,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  useHotkey,
  useHotkeySequence,
  useKeyHold,
} from "@tanstack/react-hotkeys";
import { Kbd } from "../ui/kbd";
import { useRuntime } from "@repo/react";
import { MapModal } from "./Map";
import { Input } from "./Input";
import Mouse from "./Mouse";

type ControlsProps = {
  orientation?: "bottom" | "right" | "left";
  devMode?: boolean;
};

export function Controls({
  orientation = "bottom",
  devMode = false,
}: ControlsProps) {
  const [isDevboxOpen, setIsDevboxOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const runtime = useRuntime();

  useHotkey(
    "0",
    () => {
      runtime.next();
    },
    {
      enabled: !isInputOpen,
      ignoreInputs: true,
    },
  );

  useHotkey("Escape", () => {
    // Stop walk
  });

  useHotkey("Control+D", () => {
    setIsDevboxOpen((prev) => !prev);
  });

  useHotkey(
    "Control+M",
    () => {
      setIsDevboxOpen(true);
      setIsMapOpen((prev) => !prev);
      runtime.map();
    },
    {
      enabled: devMode,
    },
  );

  useHotkey(
    "Control+I",
    () => {
      setIsDevboxOpen(true);
      runtime.listFlows();
      runtime.listActions();
      runtime.listHistory();
    },
    {
      enabled: devMode,
    },
  );

  useHotkey(
    "Control+C",
    () => {
      console.clear();
    },
    {
      enabled: devMode,
    },
  );

  useHotkey(
    "Control+A",
    () => {
      setIsInputOpen((prev) => !prev);
    },
    {
      enabled: devMode,
    },
  );

  const isNextHold = useKeyHold("0");
  const isCtrlHeld = useKeyHold("Control");
  const isMHeld = useKeyHold("M");
  const isIHeld = useKeyHold("I");
  const isCHeld = useKeyHold("C");
  const isAHeld = useKeyHold("A");
  const isMapHeld = isCtrlHeld && isMHeld;
  const isInspectHeld = isCtrlHeld && isIHeld;
  const isClearHeld = isCtrlHeld && isCHeld;
  const isInputHeld = isCtrlHeld && isAHeld;

  return (
    <TooltipProvider timeout={100} delay={100}>
      <div
        className={cn(
          "fixed bottom-6 left-1/2 transform -translate-x-1/2 z-999999 p-1 flex items-center rounded-full shadow-2xl backdrop-blur-sm bg-white/20 dark:bg-black/20",
          (orientation === "right" || orientation === "left") && "flex-col",
          orientation === "right" && "right-6 bottom-6",
          orientation === "left" && "left-6 bottom-6",
        )}
      >
        <Mouse />
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              size="lg"
              className={cn(
                "rounded-full font-brand text-lg",
                isNextHold && "text-red-500 text-xl",
              )}
              onClick={() => {
                runtime.next();
              }}
            >
              W
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Next <Kbd>0</Kbd>
            </p>
          </TooltipContent>
        </Tooltip>
        {devMode && (
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="ghost"
                size="icon-lg"
                className={cn("rounded-full", isDevboxOpen && "bg-accent")}
                onClick={() => setIsDevboxOpen(!isDevboxOpen)}
              >
                <CodeXml />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {isDevboxOpen ? "Close Devbox" : "Open Devbox"}
                <Kbd>Ctrl</Kbd> + <Kbd>D</Kbd>
              </p>
            </TooltipContent>
          </Tooltip>
        )}
        {devMode && isDevboxOpen && (
          <>
            <Tooltip>
              <TooltipTrigger>
                <MapModal
                  open={isMapOpen}
                  setOpen={setIsMapOpen}
                  trigger={
                    <Button
                      variant="ghost"
                      size="icon-lg"
                      className={cn("rounded-full", isMapHeld && "bg-accent")}
                      onClick={() => {
                        setIsMapOpen(true);
                        runtime.map();
                      }}
                    >
                      <Braces />
                    </Button>
                  }
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Map <Kbd>Control</Kbd> + <Kbd>M</Kbd>
                </p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  size="icon-lg"
                  className={cn("rounded-full", isInspectHeld && "bg-accent")}
                  onClick={() => {
                    runtime.listFlows();
                    runtime.listActions();
                    runtime.listHistory();
                  }}
                >
                  <Layers />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Inspect queues
                  <Kbd>Control</Kbd> + <Kbd>I</Kbd>
                </p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  open={isInputOpen}
                  setOpen={setIsInputOpen}
                  trigger={
                    <Button
                      variant="ghost"
                      size="icon-lg"
                      className={cn("rounded-full", isInputHeld && "bg-accent")}
                    >
                      <Brackets />
                    </Button>
                  }
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Input Actions
                  <Kbd>Control</Kbd> + <Kbd>A</Kbd>
                </p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  size="icon-lg"
                  className={cn("rounded-full", isClearHeld && "bg-accent")}
                  onClick={() => {
                    console.clear();
                  }}
                >
                  <Trash />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Clear logs <Kbd>Control</Kbd> + <Kbd>C</Kbd>
                </p>
              </TooltipContent>
            </Tooltip>
          </>
        )}
      </div>
    </TooltipProvider>
  );
}
