// Dialogs provided by Walker
export const PANEL_DIALOG_REGISTRY = {
  history: "history",
  chat: "chat",
  map: "map",
  help: "help",
} as const;

export type PanelDialogType = keyof typeof PANEL_DIALOG_REGISTRY;
