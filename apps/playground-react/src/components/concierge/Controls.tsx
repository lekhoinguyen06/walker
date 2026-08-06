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

type ControlsProps = {
  orientation?: "bottom" | "right" | "left";
  devMode?: boolean;
};

export function Controls({
  orientation = "bottom",
  devMode = false,
}: ControlsProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDevboxOpen, setIsDevboxOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const runtime = useRuntime();

  useHotkey("Space", () => {
    setIsPlaying((prev) => !prev);
  });

  useHotkey("Escape", () => {
    // Stop walk
  });

  useHotkey("Control+D", () => {
    setIsDevboxOpen((prev) => !prev);
  });

  useHotkey("M", () => {
    setIsMapOpen((prev) => !prev);
    runtime.map();
  });

  useHotkey("I", () => {
    runtime.listFlows();
    runtime.listActions();
    runtime.listHistory();
  });

  useHotkey("C", () => {
    console.clear();
  });

  const isSpaceHeld = useKeyHold("Space");
  const isExitHeld = useKeyHold("Escape");
  const isMapHeld = useKeyHold("M");
  const isInspectHeld = useKeyHold("I");
  const isClearHeld = useKeyHold("C");

  return (
    <TooltipProvider timeout={100} delay={100}>
      <div
        className={cn(
          "fixed bottom-6 left-auto right-auto z-50 flex rounded-full shadow-2xl backdrop-blur-sm bg-white/20 dark:bg-black/20",
          (orientation === "right" || orientation === "left") && "flex-col",
          orientation === "right" && "right-6 bottom-6",
          orientation === "left" && "left-6 bottom-6",
        )}
      >
        {isPlaying ? (
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="ghost"
                size="icon-lg"
                className={cn("rounded-full", isSpaceHeld && "bg-accent")}
                onClick={() => {
                  setIsPlaying(false);
                  runtime.pause();
                }}
              >
                <Pause />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Pause <Kbd>Space</Kbd>
              </p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="ghost"
                size="icon-lg"
                className={cn("rounded-full", isSpaceHeld && "bg-accent")}
                onClick={() => {
                  setIsPlaying(true);
                  runtime.manualWalk([
                    {
                      command: "click",
                      target: "dom",
                      message: "Clicking on a button",
                    },
                  ]);
                }}
              >
                <Play />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Play <Kbd>Space</Kbd>
              </p>
            </TooltipContent>
          </Tooltip>
        )}
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              size="icon-lg"
              className={cn("rounded-full", isExitHeld && "bg-accent")}
              onClick={() => {
                runtime.cancel();
              }}
            >
              <X />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Cancel <Kbd>Escape</Kbd>
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
                {isDevboxOpen ? "Close Devbox" : "Open Devbox"} <Kbd>Ctrl</Kbd>{" "}
                + <Kbd>D</Kbd>
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
                  Map <Kbd>M</Kbd>
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
                  <Kbd>I</Kbd>
                </p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  trigger={
                    <Button
                      variant="ghost"
                      size="icon-lg"
                      className={cn(
                        "rounded-full",
                        isInspectHeld && "bg-accent",
                      )}
                    >
                      <Brackets />
                    </Button>
                  }
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Input Actions
                  <Kbd>A</Kbd>
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
                  Clear logs <Kbd>C</Kbd>
                </p>
              </TooltipContent>
            </Tooltip>
          </>
        )}
      </div>
    </TooltipProvider>
  );
}
