import "@/styles/globals.css";

import { Button } from "@/components/ui/button";
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
import {
  useHotkey,
  useHotkeySequence,
  useKeyHold,
} from "@tanstack/react-hotkeys";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { create } from "zustand";
import { useWalkerInput } from "@/hooks/useWalkerInput";
import { useWalk } from "@/hooks/useWalk";
import { generateWalkPrompt } from "@/utils/prompt";
import { ChatPanel } from "../dev/Chat";
import { InputPanel } from "../dev/Input";
import { MapPanel } from "../dev/Map";
import { StackPanel } from "../dev/Stack";
import { HistoryPanel } from "../dev/History";
import { Mouse } from "../../item";
import { useRuntime } from "@/hooks/useRuntime";

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

type PanelTabType = "user" | "dev";
type DevTabType = "chat" | "input" | "map" | "stack" | "history";

type PanelStoreType = {
  url: string;

  setUrl: (url: string) => void;

  // Variants
  position: VariantProps<typeof panelVariants>["position"];
  style: VariantProps<typeof panelContentVariants>["style"];
  isHidden: boolean;

  // Tabs
  tab?: PanelTabType;
  openTab: () => void;
  closeTab: () => void;
  switchTab: (tab: PanelTabType) => void;

  // Developeent tabs
  devTab?: DevTabType;
  openDevTab: (devTab: DevTabType) => void;
  closeDevTab: () => void;

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

  tab: undefined,
  switchTab: (tab: "user" | "dev") => set({ tab }),
  openTab: () => set({ tab: "user" }),
  closeTab: () => set({ tab: undefined }),
  setTab: (tab: "user" | "dev") => set({ tab }),

  devTab: undefined,
  closeDevTab: () => set({ devTab: undefined }),
  openDevTab: (devTab?: "chat" | "input" | "map" | "stack" | "history") =>
    set({ devTab: devTab, isHidden: true }),
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
}: PanelProps): ReactNode {
  const positionState = usePanelStore((state) => state.position);
  const isHiddenState = usePanelStore((state) => state.isHidden);
  const setIsHidden = usePanelStore((state) => state.setIsHidden);
  const setStore = usePanelStore((state) => state.setStore);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStore({ position, url, isHidden: hidden });
  }, []);

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
          animate={{ y: isHiddenState ? "calc(100% + 24px)" : 0 }}
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
  const {
    isHidden,
    setIsHidden,
    url,
    style,
    tab,
    openTab,
    closeTab,
    switchTab,
  } = usePanelStore();

  const { input, setInput } = useWalkerInput();
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
    "Control+W",
    () => {
      handleSubmit();
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey(
    "Control+M",
    () => {
      tab ? closeTab() : openTab();
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey(
    "Tab",
    () => {
      if (tab === "dev") {
        switchTab("user");
      } else {
        switchTab("dev");
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
        pushToast({
          type: "info",
          message: "Input is empty, please instruct Walker.",
        });
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
      <PanelPopup
        selectedTab={tab}
        tabs={{
          user: <UserMenu onDev={() => switchTab("dev")} />,
          dev: <DevMenu onReturn={() => switchTab("user")} />,
        }}
      ></PanelPopup>
      <PanelInput input={input} setInput={setInput} onSubmit={handleSubmit} />
      <div className="w-full flex gap-1.5">
        <Button
          variant="ghost"
          size="icon"
          className={cn("rounded-full", isMenuHold && "bg-accent")}
          onClick={() => (tab ? closeTab() : openTab())}
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

export type PanelInputProps = {
  input: string;
  setInput: (input: string) => void;
  onSubmit?: () => void;
};

export function PanelInput({
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
  selectedTab?: PanelTabType;
  tabs: { [key in PanelTabType]: React.ReactNode };
  children?: React.ReactNode;
};

function PanelPopup({ selectedTab, tabs }: PanelPopupProps) {
  return (
    <motion.div
      initial={{ marginBottom: -6 }}
      animate={{
        marginBottom: selectedTab ? 0 : -6,
      }}
      transition={{ duration: 0.2 }}
    >
      <AnimatePresence>
        {selectedTab && (
          <motion.div
            className={cn("w-full flex items-center overflow-hidden")}
            key={selectedTab}
            initial={{ y: "100%", height: 0, opacity: 0 }}
            animate={{
              y: 0,
              height: "auto",
              opacity: 1,
            }}
            exit={{ y: "-100%", height: 0, opacity: 0 }}
            transition={{ duration: 0.2, type: "keyframes" }}
          >
            {tabs[selectedTab]}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

type DevMenuProps = {
  onReturn: () => void;
};

export function DevMenu({ onReturn }: DevMenuProps) {
  const tab = usePanelStore((state) => state.tab);
  const isHidden = usePanelStore((state) => state.isHidden);
  const devTab = usePanelStore((state) => state.devTab);
  const openDevTab = usePanelStore((state) => state.openDevTab);
  const closeDevTab = usePanelStore((state) => state.closeDevTab);

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

type MenuProps = {
  onDev: () => void;
};

export function UserMenu({ onDev }: MenuProps) {
  const { position, setPosition } = usePanelStore();
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
        error: "bg-red-50 text-destructive dark:bg-red-950",
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
          transition={{ duration: 0.4, type: "spring" }}
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

  const pushToast = (toast: PanelToastItemType | null) => {
    setDuration(toast?.duration ?? 3);
    setToast(toast);
  };

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, duration * 1000);

    return () => clearTimeout(timer);
  }, [toast, duration]);

  return (
    <PanelToastContext.Provider value={{ toast, pushToast }}>
      {children}
    </PanelToastContext.Provider>
  );
}
