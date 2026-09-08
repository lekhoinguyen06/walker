import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronsDown, Menu, Repeat } from "lucide-react";
import {
  useEffect,
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
        true: "translate-y-[calc(100%_+_24px)]",
        false: "translate-y-0",
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
  const isMenuHold = isCtrlHold && isMHold;

  return (
    <AnimatePresence>
      <motion.div
        className={cn(
          panelVariants({ style, position, hidden: hiddenState, className }),
        )}
        ref={ref}
        layout
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
      >
        <PanelTag isHidden={hiddenState} setHidden={setHiddenState} />
        <AnimatePresence>
          <PanelPopup isOpen={isPopupOpen}>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Repeat />
            </Button>
          </PanelPopup>
        </AnimatePresence>
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

  return (
    <Textarea
      id="walk-input"
      placeholder="Let's take a walk"
      className={cn(
        "w-full min-h-8 h-8 py-1 rounded-[16px] bg-background text-foreground resize-none",
        isExpanding && "h-16 rounded-[16px]",
      )}
      value={input}
      onChange={(e) => {
        setInput(e.target.value);
        setIsExpanding(isTooLong || isNewLine);
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
  children?: React.ReactNode;
};

function PanelPopup({ isOpen = false, children }: PanelPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="w-full flex items-center overflow-x-scroll"
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          transition={{ duration: 0.1 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
