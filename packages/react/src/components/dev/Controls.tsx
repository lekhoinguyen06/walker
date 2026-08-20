import { Bolt, CodeXml, Menu, Trash, X } from "lucide-react";
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
import Mouse from "./Mouse";
import { DevPortalModal } from "./DevPortal";
import { Input } from "../ui/input";
import { toast } from "../ui/toast";
import { generateWalkPrompt } from "./dev.prompt";
import { useConciergeWalk, useScreenSize } from "./dev.hook";
import { useWalkInputStore } from "./dev.store";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import type { useScreen } from "usehooks-ts";

type ControlsProps = {
  orientation?: "bottom" | "right" | "left";
};

function WalkInput() {
  const { runtime, walk, isWalking, submit, isLoading, actionsInQueueCount } =
    useConciergeWalk();
  const { isMobile } = useScreenSize();
  const input = useWalkInputStore((state) => state.input);
  const setInput = useWalkInputStore((state) => state.setInput);
  const isBusy = isWalking || isLoading;

  useHotkey("Control+W", () => {
    handleSubmit();
  });

  const handleSubmit = () => {
    if (actionsInQueueCount === 0 && !isBusy) {
      if (input.trim() === "") {
        toast.add({
          title: "Input is empty",
          description: "Please enter a prompt to walk the web.",
          type: "error",
        });
        return;
      }
      submit({
        prompt: generateWalkPrompt(runtime, input),
      });
    } else {
      walk();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className={cn(
        isMobile
          ? "fixed top-0 left-1/2 transform -translate-x-1/2 -translate-y-[120%] w-[90vw] max-w-96 shadow-2xl"
          : "mx-2 w-[30vw]",
      )}
    >
      <Input
        type="text"
        id="prompt-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Let's take a walk! Type your prompt here..."
        className={cn("w-full rounded-full bg-background/90")}
        disabled={isBusy || actionsInQueueCount > 0}
        autoFocus
      />
    </form>
  );
}

export function Controls({ orientation = "bottom" }: ControlsProps) {
  const { isWalking, isLoading, actionsInQueueCount } = useConciergeWalk();
  const isBusy = isWalking || isLoading;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDevOpen, setIsDevOpen] = useState(false);

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
  const isWHold = useKeyHold("W");
  const isWalkHold = isCtrlHold && isWHold;
  const isDevHold = isCtrlHold && isDHold;
  const isMenuHold = isCtrlHold && isMHold;

  return (
    <TooltipProvider timeout={100} delay={100}>
      <div
        className={cn(
          "fixed bottom-6 left-1/2 transform -translate-x-1/2 z-999999 p-1 flex items-center rounded-full shadow-2xl backdrop-blur-sm bg-white/80 dark:bg-black/80",
          (orientation === "right" || orientation === "left") && "flex-col",
          orientation === "right" && "right-6 bottom-6",
          orientation === "left" && "left-6 bottom-6",
        )}
      >
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              size="lg"
              className={cn(
                "rounded-full",
                // (isMenuOpen || isMenuHold) && "bg-accent",
              )}
              onClick={() => {
                // setIsMenuOpen((prev) => !prev);
              }}
            >
              <X />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Clear</p>
          </TooltipContent>
        </Tooltip>
        <Mouse />
        <WalkInput />
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="ghost"
                size="lg"
                className={cn(
                  "rounded-full font-brand text-lg",
                  actionsInQueueCount > 0 && !isBusy && "animate-bounce",
                  isBusy && "bg-red-500 text-white",
                  isWalkHold && "text-2xl",
                )}
                type="submit"
                disabled={isLoading}
              >
                W
              </Button>
            }
          ></TooltipTrigger>
          <TooltipContent>
            <p>
              Walk <Kbd>Ctrl</Kbd> + <Kbd>W</Kbd>
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
