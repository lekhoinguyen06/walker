import type { PanelToastItemType } from "@/components/walker/ui/panel/PanelToast";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

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
