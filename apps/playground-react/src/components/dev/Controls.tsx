import { Bolt, CodeXml, Menu, Trash } from "lucide-react";
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
import { ActionSchema, useRuntime } from "@walker/react";
import Mouse from "./Mouse";
import { DevPortalModal } from "./DevPortal";
import { useObject } from "@ai-sdk/react";
import { Input } from "../ui/input";
import { toast } from "../ui/toast";

type ControlsProps = {
  orientation?: "bottom" | "right" | "left";
};

export function Controls({ orientation = "bottom" }: ControlsProps) {
  const { walk, actionsInQueueCount, isWalking, runtime } = useRuntime();

  const { submit, isLoading } = useObject({
    api: `${process.env.VITE_WALK_API_URL}/api/walk`,
    schema: ActionSchema,
    onFinish: (result) => {
      runtime.addActions([result.object]);
      walk();
    },
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDevOpen, setIsDevOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (actionsInQueueCount > 0) {
      walk();
    } else {
      if (input.trim() === "") {
        toast.add({
          title: "Input is empty",
          description: "Please enter a prompt to walk the web.",
          type: "error",
        });
        return;
      }
      const context = {
        guide: `
        You are a Walker agent. Your task is to assist the user navigate the web.
        Your are provided flows, which are the actions you are allowed to perform.
        You are provided map, which consist of objects of Items.
        An action object is what you need to return, an example is: {
          walkId: "123",
          command: "click",
          target: "input-button",
          message: "Let's go to the input page!"
        }
      `,
        flows: runtime.listFlows(),
        map: runtime.map(),
        prompt: input.trim(),
      };

      submit({
        prompt: JSON.stringify(context),
      });
    }
  };

  useHotkey("0", () => {
    handleSubmit();
  });
  useHotkey("Control+D", () => {
    if (isMenuOpen) {
      setIsDevOpen((prev) => !prev);
    }
  });
  useHotkey("Control+M", () => {
    setIsMenuOpen((prev) => !prev);
  });

  const isNextHold = useKeyHold("0");
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="fixed top-0 left-1/2 transform -translate-x-1/2 -translate-y-[120%] w-[90vw] max-w-96 shadow-2xl"
        >
          <Input
            type="text"
            id="prompt-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Let's walk the web! Type your prompt here..."
            className="w-full rounded-full bg-background/90"
          />
        </form>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="ghost"
                size="lg"
                className={cn(
                  "rounded-full font-brand text-lg",
                  actionsInQueueCount > 0 && "text-red-500",
                  isWalking && "bg-red-500 text-white",
                  isNextHold && "text-red-500 text-2xl",
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
