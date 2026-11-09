import type { ActionType, ContextType, HookType } from "walker-shared";
import { $mouse } from "./store";

export async function mouse(
  action: ActionType,
  ctx: ContextType,
): Promise<string | void> {
  console.log("[W][D]: Mouse Hook: ", action.itemId);
  const el = document.getElementById(action.itemId);
  const child = el?.firstElementChild;

  if (child instanceof HTMLElement) {
    const rect = child.getBoundingClientRect();

    $mouse.set({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  } else {
    return (
      "ERROR: No Item found for click flow with action.itemId: " + action.itemId
    );
  }
}

export const mouseHook: HookType = {
  handler: mouse,
};
