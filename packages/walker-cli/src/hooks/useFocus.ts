import { useKeyboard } from "@opentui/react";
import { useFocusStore, type FocusTree } from "../stores/focus.store";
import { useEffect } from "react";
import { pushLog } from "../stores/log.store";

export function useFocus(focusTree: FocusTree) {
  const setFocusTree = useFocusStore((state) => state.setTree);
  const changeFocus = useFocusStore((state) => state.changeFocus);
  const clickCurrentFocus = useFocusStore((state) => state.clickCurrentFocus);

  useKeyboard((event) => {
    const shiftPressed = event.shift;

    switch (event.name) {
      case "left": {
        if (!shiftPressed) break;
        changeFocus("left");
        break;
      }
      case "up": {
        if (!shiftPressed) break;
        changeFocus("back");
        break;
      }
      case "right": {
        if (!shiftPressed) break;
        changeFocus("right");
        break;
      }
      case "down": {
        if (!shiftPressed) break;
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
