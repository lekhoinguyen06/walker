import type { ActionType, ContextType, HookType } from "walker-shared";
import { $mouseX, $mouseY } from "../stores";
import { WalkerError } from "../error";

export async function mouse(
  action: ActionType,
  ctx: ContextType,
): Promise<string | void> {
  console.log("[W][D]: Mouse Hook: ", action.itemId);
  const itemId =
    action.itemId === "" ? "walker-mouse-container" : action.itemId;

  const el = document.getElementById(itemId);
  const child = el?.firstElementChild;

  if (child instanceof HTMLElement) {
    const rect = child.getBoundingClientRect();
    $mouseX.set(rect.left + rect.width / 2);
    $mouseY.set(rect.top + rect.height / 2);
  } else {
    throw new WalkerError(
      `Mouse hook failed: No DOM element found for action.itemId: ${itemId}`,
    );
  }
}

export const mouseHook: HookType = {
  handler: mouse,
};
