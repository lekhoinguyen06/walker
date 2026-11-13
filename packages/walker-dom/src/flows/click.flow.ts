import type {
  ActionType,
  ContextType,
  FlowWithHooksAndHandlerType,
} from "walker-shared";
import { WalkerError } from "../error";

export async function click(
  action: ActionType,
  ctx: ContextType,
): Promise<string | void> {
  console.log("[W][D]: Click Flow: ", action.itemId);
  const el = document.getElementById(action.itemId);
  const child = el?.firstElementChild;

  if (child instanceof HTMLElement) {
    console.log(
      "[W][D]: Click flow executed for action.itemId: ",
      action.itemId,
    );
    child.click();
  } else {
    throw new WalkerError(
      `Click flow failed: No DOM element found for action.itemId: ${action.itemId}`,
    );
  }
}

export const clickFlow: FlowWithHooksAndHandlerType = {
  command: "click",
  handler: click,
};
