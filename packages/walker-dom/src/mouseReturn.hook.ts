import type { ActionType, ContextType, HookType } from "walker-shared";
import { $action, $mouseX, $mouseY } from "./store";

export async function mouseReturn(
  action: ActionType,
  ctx: ContextType,
): Promise<string | void> {
  console.log("[W][D]: Mouse Return Hook: ", action.itemId);
  if ($action.get().length > 0) {
    return;
  }
  const el = document.getElementById("walker-mouse-container");
  const child = el?.firstElementChild;

  if (child instanceof HTMLElement) {
    const rect = child.getBoundingClientRect();

    $mouseX.set(rect.left + rect.width / 2);
    $mouseY.set(rect.top + rect.height / 2);
  } else {
    return (
      "ERROR: No Item found for click flow with action.itemId: " + action.itemId
    );
  }
}

export const mouseReturnHook: HookType = {
  handler: mouseReturn,
};
