import type { PanelToastItemType } from "@/walker/ui/panel/PanelToast";
import {
  createContext,
  useContext,
  useEffect,
  useId,
  useState,
  type ReactNode,
} from "react";

type PanelToastContextType = {
  toast: PanelToastItemType | null;
  toastId: string;
  pushToast: (toast: PanelToastItemType) => void;
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
  const toastId = useId();

  const pushToast = (toast: PanelToastItemType) => {
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
    <PanelToastContext.Provider value={{ toast, pushToast, toastId }}>
      {children}
    </PanelToastContext.Provider>
  );
}
