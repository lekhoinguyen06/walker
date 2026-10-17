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
        changeFocus("left");
        break;
      }
      case "up": {
        if (shiftPressed) {
          changeFocus("back");
        } else {
          changeFocus("up");
        }
        break;
      }
      case "right": {
        changeFocus("right");
        break;
      }
      case "down": {
        if (shiftPressed) {
          changeFocus("enter");
        } else {
          changeFocus("down");
        }
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
