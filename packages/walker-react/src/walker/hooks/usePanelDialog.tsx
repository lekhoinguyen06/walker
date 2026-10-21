import { createContext, useContext, useState } from "react";

// Dialogs provided by Walker
export const PANEL_DIALOG_REGISTRY = {
  history: "history",
  chat: "chat",
  map: "map",
  help: "help",
} as const;

type PanelDialogType = keyof typeof PANEL_DIALOG_REGISTRY;

export function PanelDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dialog, setDialog] = useState<PanelDialogType | null>(null);

  const openDialog = (dialog: PanelDialogType) => {
    setDialog(dialog);
  };

  const closeDialog = () => {
    setDialog(null);
  };

  return (
    <PanelDialogContext.Provider value={{ dialog, openDialog, closeDialog }}>
      {children}
    </PanelDialogContext.Provider>
  );
}

type PanelDialogContextType = {
  dialog: PanelDialogType | null;
  openDialog: (dialog: PanelDialogType) => void;
  closeDialog: () => void;
};

const PanelDialogContext = createContext<PanelDialogContextType | null>(null);

export function usePanelDialog() {
  const context = useContext(PanelDialogContext);
  if (!context) {
    throw new Error(
      "usePanelDialogContext must be used within a PanelDialogProvider",
    );
  }
  return context;
}
