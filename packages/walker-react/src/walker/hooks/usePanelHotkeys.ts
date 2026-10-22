import { useHotkey, useKeyHold } from "@tanstack/react-hotkeys";
import { useConfig } from "./useConfig";
import { usePanel } from "./usePanel";
import { usePanelDialog } from "./usePanelDialog";
import { usePanelWalk } from "./useWalk";
import { useRuntime } from "./useRuntime";
import { togglePanelPosition } from "../ui";
import { usePanelToast } from "./usePanelToast";
import { useMemo } from "react";

export function usePanelHotkeys() {
  const { isHidden, setIsHidden, tab, setTab, position, setPosition } =
    usePanel();
  const { config, setConfig } = useConfig();
  const { pushToast } = usePanelToast();
  const { dialog, openDialog, closeDialog } = usePanelDialog();
  const { handleSubmit, handleStop } = usePanelWalk();
  const { runtime } = useRuntime();

  useHotkey("W", () => {
    isHidden ? setIsHidden(false) : setIsHidden(true);
  });

  useHotkey(
    "Enter",
    () => {
      handleSubmit();
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey(
    "Space",
    () => {
      const inputElement = document.getElementById("walk-input");
      inputElement?.focus();
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey("Control+C", () => {
    handleStop();
  });

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
    "L",
    () => {
      setConfig({ ...config, loop: !config.loop });
      pushToast({
        type: "info",
        message: !config.loop
          ? "Switched to loop mode."
          : "Switched to step mode.",
      });
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey(
    "M",
    () => {
      dialog == "map" ? closeDialog() : openDialog("map");
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey(
    "C",
    () => {
      dialog == "chat" ? closeDialog() : openDialog("chat");
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey(
    "H",
    () => {
      dialog == "history" ? closeDialog() : openDialog("history");
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey(
    "P",
    () => {
      if (position) {
        setPosition(togglePanelPosition(position));
      }
    },
    {
      enabled: !isHidden,
    },
  );

  useHotkey(
    "Control+H",
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
    "Control+/",
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
