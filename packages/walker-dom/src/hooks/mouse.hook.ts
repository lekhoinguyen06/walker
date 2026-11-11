import type { ActionType, ContextType, HookType } from "walker-shared";
import { $mouseX, $mouseY } from "../stores";

export async function mouse(
  action: ActionType,
  ctx: ContextType,
): Promise<string | void> {
  console.log("[W][D]: Mouse Hook: ", action.itemId);
  const el = document.getElementById(action.itemId);
  const child = el?.firstElementChild;

  if (child instanceof HTMLElement) {
    const rect = child.getBoundingClientRect();

    console.log(
      "mouseX:",
      rect.left + rect.width / 2,
      "mouseY:",
      rect.top + rect.height / 2,
    );
    $mouseX.set(rect.left + rect.width / 2);
    $mouseY.set(rect.top + rect.height / 2);
    console.log(
      "mouseX:",
      rect.left + rect.width / 2,
      "mouseY:",
      rect.top + rect.height / 2,
    );
  } else {
    return (
      "ERROR: No Item found for click flow with action.itemId: " + action.itemId
    );
  }
}

export const mouseHook: HookType = {
  handler: mouse,
};
