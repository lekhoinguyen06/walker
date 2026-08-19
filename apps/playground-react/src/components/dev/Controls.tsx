import { Bolt, CodeXml, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useHotkey, useKeyHold } from "@tanstack/react-hotkeys";
import { Kbd } from "../ui/kbd";
import { useRuntime } from "@walker/react";
import Mouse from "./Mouse";
import { DevPortalModal } from "./DevPortal";

type ControlsProps = {
  orientation?: "bottom" | "right" | "left";
};

export function Controls({ orientation = "bottom" }: ControlsProps) {
  const runtime = useRuntime();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDevOpen, setIsDevOpen] = useState(false);

  useHotkey("0", () => {
    runtime.next();
  });
  const isNextHold = useKeyHold("0");

  useHotkey("Control+D", () => {
    if (isMenuOpen) {
      setIsDevOpen((prev) => !prev);
    }
  });

  useHotkey("Control+M", () => {
    setIsMenuOpen((prev) => !prev);
  });
  const isCtrlHold = useKeyHold("Control");
  const isMHold = useKeyHold("M");
  const isDHold = useKeyHold("D");
  const isDevHold = isCtrlHold && isDHold;
  const isMenuHold = isCtrlHold && isMHold;

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
                isNextHold && "text-red-500 text-2xl",
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
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              size="lg"
              className={cn(
                "rounded-full",
                (isMenuOpen || isMenuHold) && "bg-accent",
              )}
              onClick={() => {
                setIsMenuOpen((prev) => !prev);
              }}
            >
              <Menu />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Menu <Kbd>Ctrl</Kbd> + <Kbd>M</Kbd>
            </p>
          </TooltipContent>
        </Tooltip>
        {isMenuOpen && (
          <>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  size="lg"
                  className={cn("rounded-full")}
                  onClick={() => {}}
                >
                  <Bolt />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Settings <Kbd>Ctrl</Kbd> + <Kbd>S</Kbd>
                </p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <DevPortalModal
                  open={isDevOpen}
                  setOpen={setIsDevOpen}
                  trigger={
                    <Button
                      variant="ghost"
                      size="lg"
                      className={cn(
                        "rounded-full",
                        (isDevOpen || isDevHold) && "bg-accent",
                      )}
                      onClick={() => {
                        setIsDevOpen((prev) => !prev);
                      }}
                    >
                      <CodeXml />
                    </Button>
                  }
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  DevTools <Kbd>Ctrl</Kbd> + <Kbd>D</Kbd>
                </p>
              </TooltipContent>
            </Tooltip>
          </>
        )}
      </div>
    </TooltipProvider>
  );
}
