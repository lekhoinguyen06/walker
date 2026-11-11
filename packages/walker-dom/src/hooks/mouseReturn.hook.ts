import type { ActionType, ContextType, HookType } from "walker-shared";
import { $action, $mouseX, $mouseY } from "../stores";
import { WalkerError } from "../error";

export async function mouseReturn(
  action: ActionType,
  ctx: ContextType,
): Promise<string | void> {
  console.log("[W][D]: Mouse Return Hook");

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
    throw new WalkerError(
      `Mouse return hook failed: No DOM element found for walker-mouse-container. Please ensure that the element with id 'walker-mouse-container' exists in the DOM.`,
    );
  }
}

export const mouseReturnHook: HookType = {
  handler: mouseReturn,
};
