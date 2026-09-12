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
  PanelBottom,
  PanelLeft,
  Repeat,
  Trash,
} from "lucide-react";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type RefObject,
  type SetStateAction,
} from "react";
import { useCountdown, useInterval, useOnClickOutside } from "usehooks-ts";
import { AnimatePresence, motion } from "motion/react";
import { useHotkey, useKeyHold } from "@tanstack/react-hotkeys";
import { Textarea } from "@/components/ui/textarea";
import Mouse from "./Mouse";
import { useWalk } from "./dev.hook";
import { generateWalkPrompt } from "./dev.prompt";
import { useWalkInputStore } from "./dev.store";
import { Chat } from "./Chat";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { create } from "zustand";
import { useRuntime } from "@/RuntimeProvider";

const PANEL_POSITION = {
  LEFT: "left",
  RIGHT: "right",
  BOTTOM: "bottom",
} as const;

type PanelPosition = (typeof PANEL_POSITIONS)[number];

const PANEL_POSITIONS = [
  PANEL_POSITION.LEFT,
  PANEL_POSITION.RIGHT,
  PANEL_POSITION.BOTTOM,
] as const;

function togglePanelPosition(position: PanelPosition): PanelPosition {
  const index = PANEL_POSITIONS.indexOf(position);
  return PANEL_POSITIONS[(index + 1) % PANEL_POSITIONS.length] as PanelPosition;
}

type PanelStoreType = {
  url: string;

  setUrl: (url: string) => void;

  // Variants
  position: VariantProps<typeof panelVariants>["position"];
  style: VariantProps<typeof panelContentVariants>["style"];
  isHidden: boolean;

  setPosition: (
    position: VariantProps<typeof panelVariants>["position"],
  ) => void;
  setStyle: (style: VariantProps<typeof panelContentVariants>["style"]) => void;
  setIsHidden: (isHidden: boolean) => void;

  // Constructor
  setStore: (state: Partial<PanelStoreType>) => void;
};

const usePanelStore = create<PanelStoreType>((set) => ({
  setStore: (state: Partial<PanelStoreType>) => set(state),

  url: "",
  setUrl: (url: string) => set({ url }),

  position: "bottom",
  setPosition: (position: VariantProps<typeof panelVariants>["position"]) =>
    set({ position }),
  style: "primary",
  setStyle: (style: VariantProps<typeof panelContentVariants>["style"]) =>
    set({ style }),
  isHidden: false,
  setIsHidden: (isHidden: boolean) => set({ isHidden }),
}));

const panelVariants = cva(
  "z-999999 flex flex-col w-full max-w-[90vw] sm:max-w-xl",
  {
    variants: {
      position: {
        [PANEL_POSITION.BOTTOM]: "fixed left-1/2 -translate-x-1/2 bottom-6",
        [PANEL_POSITION.LEFT]: "fixed left-6 bottom-6",
        [PANEL_POSITION.RIGHT]: "fixed right-6 bottom-6",
      },
    },
    defaultVariants: {
      position: "bottom",
    },
  },
);

const panelContentVariants = cva(
  "relative flex flex-col w-full p-1.5 gap-1.5 rounded-[24px] shadow-2xl",
  {
    variants: {
      style: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        glass: "bg-background/80 text-foreground backdrop-blur-md",
      },
    },
    defaultVariants: {
      style: "primary",
    },
  },
);

export type PanelProps = VariantProps<typeof panelVariants> & {
  hidden?: boolean;
  url: string;
  className?: string;
};

export function Panel({
  position = "bottom",
  url,
  hidden,
  className,
}: PanelProps) {
  const {
    position: positionState,
    isHidden: hiddenState,
    setIsHidden,
    setStore,
  } = usePanelStore();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStore({ position, url, isHidden: hidden });
  }, [position, url, hidden, setStore]);

  function handleClickOutside() {
    setIsHidden(true);
  }

  useOnClickOutside(ref as RefObject<HTMLElement>, handleClickOutside);

  return (
    <motion.div
      layout
      ref={ref}
      transition={{
        duration: 0.2,
        ease: "anticipate",
      }}
      className={cn(panelVariants({ position: positionState, className }))}
    >
      <AnimatePresence>
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: hiddenState ? "calc(100% + 24px)" : 0 }}
          exit={{ y: 0 }}
          transition={{
            duration: 0.2,
            ease: "anticipate",
          }}
        >
          {/* Absolute componnents */}
          <PanelTag />

          {/* Flex-col components */}
          <PanelToast />
          <PanelContent />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export function PanelContent({ className }: { className?: string }) {
  const { isHidden, setIsHidden, url, style } = usePanelStore();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"menu" | "dev">("menu");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const input = useWalkInputStore((state) => state.input);
  const setInput = useWalkInputStore((state) => state.setInput);
  const ref = useRef<HTMLDivElement>(null);
  const { submit, isLoading, actionsInQueueCount, isWalking, runtime, walk } =
    useWalk({
      url,
    });
  function handleClickOutside() {
    setIsHidden(true);
  }

  useOnClickOutside(ref as RefObject<HTMLElement>, handleClickOutside);

  useHotkey("Control+P", () => {
    setIsHidden(!isHidden);
  });

  useHotkey(
    "Control+M",
    () => {
      setIsPopupOpen((prev) => !prev);
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey(
    "Control+W",
    () => {
      handleSubmit();
    },
    {
      enabled: !isHidden,
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
      enabled: !isHidden,
    },
  );

  const { pushToast } = usePanelToast();
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
      pushToast({
        type: "info",
        message: "Manual walk",
      });
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
    <div className={cn(panelContentVariants({ style, className }))}>
      <Chat isOpen={isChatOpen} setIsOpen={setIsChatOpen} />

      <PanelPopup
        isOpen={isPopupOpen}
        selectedTab={selectedTab}
        tabs={{
          menu: <UserMenu onDev={() => setSelectedTab("dev")} />,
          dev: (
            <DevMenu
              onReturn={() => setSelectedTab("menu")}
              onChatClick={() => {
                setIsChatOpen(true);
                setIsHidden(true);
              }}
            />
          ),
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
        <PanelSuggest />
        <Mouse>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full",
              isLoading && "bg-accent text-black",
              isWalking && "bg-red-500 text-white",
            )}
            onClick={handleSubmit}
          >
            <span className="font-brand">W</span>
          </Button>
        </Mouse>
      </div>
    </div>
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

function PanelTag() {
  const { isHidden, setIsHidden } = usePanelStore();
  return (
    <div className="absolute top-0 left-1/2 -translate-y-full -translate-x-1/2">
      <Button
        variant="default"
        size="icon"
        className="rounded-none border-none shadow-2xl"
        onClick={() => {
          setIsHidden(!isHidden);
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
  onChatClick: () => void;
};

export function DevMenu({ onReturn, onChatClick }: DevMenuProps) {
  return (
    <TooltipProvider timeout={100} delay={100}>
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
            onClick={onChatClick}
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
          <Button variant="ghost" size="icon" className="rounded-full">
            <Brackets />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Open manual input panel</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Layers />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Open stack panel</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="ghost" size="icon" className="rounded-full">
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
  );
}

type MenuProps = {
  onDev: () => void;
};

export function UserMenu({ onDev }: MenuProps) {
  const { position, setPosition } = usePanelStore();
  const { pushToast } = usePanelToast();
  const { runtime } = useRuntime();
  return (
    <TooltipProvider timeout={100} delay={100}>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="ghost" size="icon" className="rounded-full">
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

type SuggestType = {
  url: string;
  alt: string;
};

type SuggestBuffer = SuggestType[];

const suggestions: SuggestBuffer = [
  {
    url: "https://i.pinimg.com/1200x/a4/36/60/a43660b58cc3bc73a74891b5d3057fba.jpg",
    alt: "Suggest",
  },
  {
    url: "https://i.pinimg.com/736x/0e/d9/8c/0ed98cb79189661757777d66eca52437.jpg",
    alt: "Suggest",
  },
  {
    url: "https://i.pinimg.com/originals/fe/63/ae/fe63ae16020f4e852b818dc3d1452e26.gif",
    alt: "Suggest",
  },
  {
    url: "https://i.pinimg.com/originals/0d/bb/34/0dbb3414f38ec6a65d10d88225d71cb2.gif",
    alt: "Suggest",
  },
];

export function PanelSuggest() {
  const [count, setCount] = useState<number>(0);
  const [delay, setDelay] = useState<number>(10000);
  const [isPlaying, setPlaying] = useState<boolean>(true);

  useInterval(
    () => {
      if (count >= suggestions.length - 1) {
        setCount(0);
      } else {
        setCount(count + 1);
      }
    },
    isPlaying ? delay : null,
  );

  return (
    <div className="w-full h-8 flex items-center justify-center rounded-full bg-muted overflow-hidden">
      {suggestions[count] && (
        <img
          src={suggestions[count].url}
          alt={suggestions[count].alt}
          className="size-full object-cover"
        />
      )}
    </div>
  );
}

const panelToastVariants = cva(
  "w-full flex flex-col pb-6 -mb-6 rounded-t-[24px]",
  {
    variants: {
      type: {
        walking: "bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-50",
        info: "bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-50",
        success:
          "bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-50",
        warn: "bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-50",
        error: "bg-destructive/10 text-destructive dark:bg-destructive/90",
      },
    },
    defaultVariants: {
      type: "info",
    },
  },
);

export function PanelToast() {
  const { isHidden, setIsHidden } = usePanelStore();
  const { toast } = usePanelToast();
  useEffect(() => {
    if (isHidden) {
      setIsHidden(false);
    }
  }, [toast]);
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ y: "100%", height: 0, opacity: 0 }}
          animate={{
            y: 0,
            height: "auto",
            opacity: 1,
          }}
          exit={{ y: "100%", height: 0, opacity: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className={cn(panelToastVariants({ type: toast.type }))}
        >
          <div className="w-full flex items-center px-6 min-h-8">
            <span
              className={cn(
                "text-sm",
                toast.type === "walking" ? "shimmer" : "",
              )}
            >
              {toast.message}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type PanelToastItemType = {
  type: VariantProps<typeof panelToastVariants>["type"];
  message: string;
  duration?: number;
};

type PanelToastContextType = {
  toast: PanelToastItemType | null;
  pushToast: (toast: PanelToastItemType | null) => void;
};

const PanelToastContext = createContext<PanelToastContextType | null>(null);

export function usePanelToast() {
  const cxt = useContext(PanelToastContext);
  if (!cxt) {
    throw new Error("usePanelToast must be used within a PanelToastProvider");
  }
  return cxt;
}

export function PanelToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<PanelToastItemType | null>(null);
  const [duration, setDuration] = useState<number>(3);

  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: duration,
    intervalMs: 1000,
  });

  const pushToast = (toast: PanelToastItemType | null) => {
    setToast(toast);
  };

  useEffect(() => {
    if (!toast) return;

    const nextDuration = toast.duration ?? 3;

    setDuration(nextDuration);
  }, [toast]);

  useEffect(() => {
    if (!toast) return;

    resetCountdown();
    startCountdown();
  }, [duration, toast, resetCountdown, startCountdown]);

  useEffect(() => {
    if (count === 0 && toast) {
      setToast(null);
    }
  }, [count, toast]);

  return (
    <PanelToastContext.Provider value={{ toast, pushToast }}>
      {children}
    </PanelToastContext.Provider>
  );
}
