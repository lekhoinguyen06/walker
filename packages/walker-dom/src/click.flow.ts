import { scrollHook } from "./scroll.hook";
import type { ActionType, Context, Flow } from "./type";

export async function click(
  action: Action,
  ctx: Context,
): Promise<string | void> {
  const el = document.getElementById("walker-" + action.itemId);
  const child = el?.firstElementChild;

  if (child instanceof HTMLElement) {
    child.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  } else {
    return (
      "ERROR: No Item found for click flow with action.itemId: " + action.itemId
    );
  }
}

export const clickFlow: Flow = {
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
