import { Braces, CodeXml, Layers, Pause, Play, X } from "lucide-react";
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

  useHotkeySequence(["Control+D", "M"], () => {
    setIsDevboxOpen((prev) => !prev);
  });

  useHotkeySequence(["Control+D", "I"], () => {
    setIsDevboxOpen((prev) => !prev);
  });

  const isSpaceHeld = useKeyHold("Space");
  const isExitHeld = useKeyHold("Escape");
  const isMapHeld = useKeyHold("M");
  const isInspectHeld = useKeyHold("I");

  return (
    <TooltipProvider timeout={100} delay={100}>
      <div
        className={cn(
          "fixed bottom-6 left-auto right-auto z-50 flex rounded-full shadow-2xl",
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
                <Button
                  variant="ghost"
                  size="icon-lg"
                  className={cn("rounded-full", isMapHeld && "bg-accent")}
                  onClick={() => {
                    // Map queues
                  }}
                >
                  <Braces />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Map <Kbd>Ctrl</Kbd> + <Kbd>D</Kbd> then <Kbd>M</Kbd>
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
                  Inspect queues <Kbd>Ctrl</Kbd> + <Kbd>D</Kbd> then{" "}
                  <Kbd>I</Kbd>
                </p>
              </TooltipContent>
            </Tooltip>
          </>
        )}
      </div>
    </TooltipProvider>
  );
}
