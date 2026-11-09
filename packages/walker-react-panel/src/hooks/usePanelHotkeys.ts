import { useHotkey, useKeyHold } from "@tanstack/react-hotkeys";
import { usePanel } from "./usePanel";
import { usePanelDialog } from "./usePanelDialog";
import { usePanelToast } from "./usePanelToast";
import { useMemo } from "react";
import { useWalk } from "walker-react";

export function usePanelHotkeys() {
  const { isHidden, setIsHidden, tab, setTab, context } = usePanel();
  const { pushToast } = usePanelToast();
  const { dialog, openDialog, closeDialog } = usePanelDialog();
  const { mutate, loading, data } = useWalk();

  useHotkey("Control+W", () => {
    isHidden ? setIsHidden(false) : setIsHidden(true);
  });

  useHotkey(
    "Control+Enter",
    () => {
      mutate(context);
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey(
    "Control+Space",
    () => {
      const inputElement = document.getElementById("walk-input");
      inputElement?.focus();
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey(
    "Tab",
    () => {
      tab ? setTab(null) : setTab("default");
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey(
    "Control+M",
    () => {
      dialog == "map" ? closeDialog() : openDialog("map");
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey(
    "Control+C",
    () => {
      dialog == "chat" ? closeDialog() : openDialog("chat");
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey(
    "Control+H",
    () => {
      dialog == "history" ? closeDialog() : openDialog("history");
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey(
    "Control+I",
    () => {
      dialog == "input" ? closeDialog() : openDialog("input");
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey(
    "Alt+H",
    () => {
      runtime.clear();
      pushToast({
        type: "success",
        message: "Cleared walk history.",
        duration: 1,
      });
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey(
    "Control+,",
    () => {
      dialog == "help" ? closeDialog() : openDialog("help");
    },
    {
      enabled: !isHidden,
    },
  );

  const isCtrlHold = useKeyHold("Control");
  const isMHold = useKeyHold("M");
  const isMenuHold = useMemo(
    () => isCtrlHold && isMHold,
    [isCtrlHold, isMHold],
  );

  return {
    isMenuHold,
  };
}
