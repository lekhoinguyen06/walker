import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Brackets,
  ChevronLeft,
  ChevronsDown,
  Code,
  History,
  Layers,
  ListCheck,
  Map,
  Menu,
  MessageCircle,
  MousePointer,
  Repeat,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useOnClickOutside } from "usehooks-ts";
import { AnimatePresence, motion } from "motion/react";
import { useHotkey, useKeyHold } from "@tanstack/react-hotkeys";
import { Textarea } from "@/components/ui/textarea";
import Mouse from "./Mouse";
import { useWalk } from "./dev.hook";
import { generateWalkPrompt } from "./dev.prompt";
import type { set } from "zod/v3";
import { useWalkInputStore } from "./dev.store";

const panelVariants = cva(
  "relative z-999999 flex flex-col w-full max-w-[90vw] sm:max-w-xl p-1.5 gap-1.5 rounded-[24px] shadow-2xl",
  {
    variants: {
      style: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        glass: "bg-background/80 text-foreground backdrop-blur-md",
      },
      position: {
        bottom: "fixed bottom-6 left-1/2 -translate-x-1/2",
        left: "fixed bottom-6 left-6",
        right: "fixed bottom-6 right-6",
      },
      hidden: {
        // true: "translate-y-[calc(100%_+_24px)]",
        // false: "translate-y-0",
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      style: "primary",
      position: "bottom",
      hidden: true,
    },
  },
);

export type PanelProps = VariantProps<typeof panelVariants> & {
  url: string;
  className?: string;
};

export function Panel({
  style = "primary",
  position = "bottom",
  hidden = true,
  url,
  className,
}: PanelProps) {
  const [hiddenState, setHiddenState] = useState(hidden ?? true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"menu" | "dev">("menu");
  const input = useWalkInputStore((state) => state.input);
  const setInput = useWalkInputStore((state) => state.setInput);
  const ref = useRef(null);
  const { submit, isLoading, actionsInQueueCount, isWalking, runtime, walk } =
    useWalk({
      url,
    });

  function handleClickOutside() {
    setHiddenState(true);
  }

  useOnClickOutside(ref, handleClickOutside);

  useHotkey("Control+P", () => {
    setHiddenState((prev) => !prev);
  });

  useHotkey(
    "Control+M",
    () => {
      setIsPopupOpen((prev) => !prev);
    },
    {
      enabled: !hiddenState,
    },
  );

  useHotkey(
    "Control+W",
    () => {
      handleSubmit();
    },
    {
      enabled: !hiddenState,
    },
  );

  useHotkey(
    "Control+D",
    () => {
      if (selectedTab === "dev") {
        setSelectedTab("menu");
      } else {
        setSelectedTab("dev");
      }
    },
    {
      enabled: !hiddenState,
    },
  );

  const handleSubmit = () => {
    if (actionsInQueueCount === 0 && !isLoading && !isWalking) {
      if (input.trim() === "") {
        return;
      }
      submit({
        input,
        prompt: generateWalkPrompt(runtime, input),
      });
    } else {
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
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial={{ y: 0 }}
        animate={{ y: hiddenState ? "calc(100% + 24px)" : 0 }}
        exit={{ y: 0 }}
        transition={{
          duration: 0.2,
          ease: "anticipate",
        }}
        className={cn(
          panelVariants({ style, position, hidden: hiddenState, className }),
        )}
      >
        <PanelTag isHidden={hiddenState} setHidden={setHiddenState} />
        <PanelPopup
          isOpen={isPopupOpen}
          selectedTab={selectedTab}
          tabs={{
            menu: <UserMenu onDev={() => setSelectedTab("dev")} />,
            dev: <DevMenu onReturn={() => setSelectedTab("menu")} />,
          }}
        ></PanelPopup>
        <PanelInput input={input} setInput={setInput} onSubmit={handleSubmit} />
        <div className="w-full flex gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className={cn("rounded-full", isMenuHold && "bg-accent")}
            onClick={() => setIsPopupOpen((prev) => !prev)}
          >
            <Menu />
          </Button>
          <div className="w-full flex gap-3 items-center rounded-full px-3 bg-red-500">
            <span className="font-bold">vstaffs</span>
            <span className="font-bold">People. Believe.</span>
          </div>
          <Mouse>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-full",
                isLoading && "bg-accent text-black",
                isWalking && "bg-red-500 text-white",
              )}
            >
              <span className="font-brand">W</span>
            </Button>
          </Mouse>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export type PanelInputProps = React.ComponentProps<typeof Input> & {
  input: string;
  setInput: (input: string) => void;
  onSubmit?: () => void;
};

export function PanelInput({
  className,
  input,
  setInput,
  onSubmit,
  ...props
}: PanelInputProps) {
  const [isExpanding, setIsExpanding] = useState(false);
  const isTooLong = input.length > 50;
  const isNewLine = input.includes("\n");

  useEffect(() => {
    setIsExpanding(isTooLong || isNewLine);
  }, [input]);

  return (
    <Textarea
      id="walk-input"
      placeholder="Let's take a walk"
      className={cn(
        "w-full min-h-none h-8 py-1 rounded-[16px] bg-background text-foreground resize-none shrink-0",
        isExpanding && "h-16 rounded-[16px]",
      )}
      value={input}
      onChange={(e) => {
        setInput(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key !== "Enter") return;

        if (e.shiftKey) {
          return;
        }

        e.preventDefault();
        onSubmit?.();
      }}
    />
  );
}

type PanelTagProps = {
  isHidden: boolean;
  setHidden: Dispatch<SetStateAction<boolean>>;
};

function PanelTag({ isHidden, setHidden }: PanelTagProps) {
  return (
    <div className="absolute top-0 left-1/2 translate-y-[-96%] -translate-x-1/2 shadow-lg">
      <Button
        variant="default"
        size="icon"
        className="rounded-none"
        onClick={() => {
          setHidden((prev) => !prev);
        }}
      >
        <motion.div
          animate={{ rotate: isHidden ? 180 : 0 }}
          transition={{ duration: 0.1 }}
        >
          <ChevronsDown />
        </motion.div>
      </Button>
    </div>
  );
}

type PanelPopupProps = {
  isOpen?: boolean;
  selectedTab: string;
  tabs: { [key: string]: React.ReactNode };
  children?: React.ReactNode;
};

function PanelPopup({ isOpen = false, selectedTab, tabs }: PanelPopupProps) {
  return (
    <div className={cn(isOpen ? "" : "-mb-1.5")}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={selectedTab}
            className="w-full flex items-center overflow-x-scroll"
            initial={{ y: "100%", height: 0, opacity: 0, scaleY: 0.8 }}
            animate={{
              y: 0,
              height: "auto",
              opacity: 1,
              scaleY: 1,
            }}
            exit={{ y: "-100%", height: 0, opacity: 0, scaleY: 0.8 }}
            transition={{ duration: 0.2, type: "keyframes" }}
          >
            {tabs[selectedTab]}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type DevMenuProps = {
  onReturn: () => void;
};

export function DevMenu({ onReturn }: DevMenuProps) {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={onReturn}
      >
        <ChevronLeft />
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full">
        <MessageCircle />
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full">
        <Brackets />
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full">
        <Layers />
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full">
        <History />
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full">
        <ListCheck />
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full">
        <MousePointer />
      </Button>
    </>
  );
}

type MenuProps = {
  onDev: () => void;
};

export function UserMenu({ onDev }: MenuProps) {
  return (
    <>
      <Button variant="ghost" size="icon" className="rounded-full">
        <Repeat />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={onDev}
      >
        <Code />
      </Button>
    </>
  );
}
