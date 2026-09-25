import { useHotkeySequence } from "@tanstack/react-hotkeys";
import { ChatPanel } from "../dev/Chat";
import { InputPanel } from "../dev/Input";
import { MapPanel } from "../dev/Map";
import { StackPanel } from "../dev/Stack";
import { HistoryPanel } from "../dev/History";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  Brackets,
  ChevronLeft,
  History,
  Layers,
  ListCheck,
  Map,
  MessageCircle,
  MousePointer,
} from "lucide-react";
import { usePanel } from "@/hooks";

type DevMenuProps = {
  onReturn: () => void;
};

export function DevMenu({ onReturn }: DevMenuProps) {
  const { tab, isHidden, devTab, openDevTab, closeDevTab } = usePanel();

  useHotkeySequence(
    ["C"],
    () => {
      devTab ? closeDevTab() : openDevTab("chat");
    },
    {
      enabled: !isHidden && tab === "dev",
    },
  );

  useHotkeySequence(
    ["I"],
    () => {
      devTab ? closeDevTab() : openDevTab("input");
    },
    {
      enabled: !isHidden && tab === "dev",
    },
  );

  useHotkeySequence(
    ["M"],
    () => {
      devTab ? closeDevTab() : openDevTab("map");
    },
    {
      enabled: !isHidden && tab === "dev",
    },
  );

  useHotkeySequence(
    ["H"],
    () => {
      devTab ? closeDevTab() : openDevTab("history");
    },
    {
      enabled: !isHidden && tab === "dev",
    },
  );

  useHotkeySequence(
    ["S"],
    () => {
      devTab ? closeDevTab() : openDevTab("stack");
    },
    {
      enabled: !isHidden && tab === "dev",
    },
  );

  return (
    <>
      <ChatPanel isOpen={devTab === "chat"} setIsOpen={() => closeDevTab()} />
      <InputPanel isOpen={devTab === "input"} setIsOpen={() => closeDevTab()} />
      <MapPanel isOpen={devTab === "map"} setIsOpen={() => closeDevTab()} />
      <StackPanel isOpen={devTab === "stack"} setIsOpen={() => closeDevTab()} />
      <HistoryPanel
        isOpen={devTab === "history"}
        setIsOpen={() => closeDevTab()}
      />
      <TooltipProvider delay={400}>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={onReturn}
            >
              <ChevronLeft />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Return to menu</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => openDevTab("chat")}
            >
              <MessageCircle />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Open chat panel</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => openDevTab("input")}
            >
              <Brackets />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Open manual input panel</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => openDevTab("map")}
            >
              <Map />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Open map panel</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => openDevTab("stack")}
            >
              <Layers />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Open stack panel</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => openDevTab("history")}
            >
              <History />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Open history panel</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="ghost" size="icon" className="rounded-full">
              <ListCheck />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Open test panel</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MousePointer />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Enable interactive inspection</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
