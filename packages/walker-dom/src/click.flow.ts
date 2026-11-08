import { scrollHook } from "./scroll.hook";
import type { Action, Context, Flow } from "./type";

export async function click<F extends string>(
  action: Action<F>,
  ctx: Context<F>,
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

export const clickFlow: Flow<string> = {
  command: "click",
  beforeHooks: [
    {
      handler: (action) => console.log("Before click hook", action),
    },
    scrollHook,
  ],
  handler: click,
  afterHooks: [
    {
      handler: (action) => console.log("After click hook", action),
    },
  ],
};
