import { usePanel, useRuntime } from "@/hooks";
import { usePanelToast } from "@/hooks";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Code, PanelBottom, Repeat, Trash } from "lucide-react";
import { togglePanelPosition } from "./Panel";

type MenuProps = {
  onDev: () => void;
};

export function UserMenu({ onDev }: MenuProps) {
  const { position, setPosition } = usePanel();
  const { pushToast } = usePanelToast();
  const { runtime, config, setConfig } = useRuntime();
  return (
    <TooltipProvider delay={400}>
      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full",
              config.loop && "bg-accent text-primary",
            )}
            onClick={() => {
              setConfig({ ...config, loop: !config.loop });
              pushToast({
                type: "info",
                message: !config.loop
                  ? "Switched to loop mode."
                  : "Switched to step mode.",
              });
            }}
          >
            <Repeat />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Switch to loop mode</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => {
              if (position) {
                setPosition(togglePanelPosition(position));
              }
            }}
          >
            <PanelBottom />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle panel position</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => {
              runtime.clear();
              pushToast({
                type: "success",
                message: "Cleared walk history.",
                duration: 1,
              });
            }}
          >
            <Trash />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Clear walk history</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={onDev}
          >
            <Code />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Developer menu</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
