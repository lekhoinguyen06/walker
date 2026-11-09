import type {
  ActionType,
  ContextType,
  FlowWithHooksAndHandlerType,
} from "walker-shared";
import { scrollHook } from "./scroll.hook";

export async function click(
  action: ActionType,
  ctx: ContextType,
): Promise<string | void> {
  const el = document.getElementById(action.itemId);
  const child = el?.firstElementChild;

  console.log(el);
  console.log(child);
  if (child instanceof HTMLElement) {
    console.log(
      "[W][D]: Click flow executed for action.itemId: ",
      action.itemId,
    );
    child.click();
  } else {
    return (
      "ERROR: No Item found for click flow with action.itemId: " + action.itemId
    );
  }
}

export const clickFlow: FlowWithHooksAndHandlerType = {
  command: "click",
  beforeHooks: [
    {
      handler: async (action) => console.log("Before click hook", action),
    },
    scrollHook,
  ],
  handler: click,
  afterHooks: [
    {
      handler: async (action) => console.log("After click hook", action),
    },
  ],
};
