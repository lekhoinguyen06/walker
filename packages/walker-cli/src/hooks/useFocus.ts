import { useKeyboard } from "@opentui/react";
import { useFocusStore, type FocusTree } from "../stores/focus.store";
import { useEffect } from "react";
import { navFocusIds } from "../components/App";

export function useFocus(focusTree: FocusTree) {
  const setFocusTree = useFocusStore((state) => state.setTree);
  const setFocusId = useFocusStore((state) => state.setFocusId);
  const changeFocus = useFocusStore((state) => state.changeFocus);
  const clickCurrentFocus = useFocusStore((state) => state.clickCurrentFocus);

  useKeyboard((event) => {
    const shiftPressed = event.shift;
    switch (event.name) {
      // Hotkeys
      case "n": {
        shiftPressed && setFocusId(navFocusIds.navigation.value);
        break;
      }
      case "h": {
        shiftPressed &&
          setFocusId(navFocusIds.navigation.children.homeTabButton.value);
        break;
      }
      case "l": {
        shiftPressed &&
          setFocusId(navFocusIds.navigation.children.localTabButton.value);
        break;
      }
      case "c": {
        shiftPressed &&
          setFocusId(navFocusIds.navigation.children.configTabButton.value);
        break;
      }

      // Focus navigation
      case "left": {
        changeFocus("left");
        break;
      }
      case "up": {
        changeFocus("back");
        break;
      }
      case "right": {
        changeFocus("right");
        break;
      }
      case "down": {
        changeFocus("enter");
        break;
      }
      case "return": {
        clickCurrentFocus();
        break;
      }
    }
  });

  useEffect(() => {
    setFocusTree(focusTree);
  }, [focusTree]);
}

export function useFocusId() {
  const focusedId = useFocusStore((state) => state.currentFocusId);
  return {
    focusedId,
  };
}
