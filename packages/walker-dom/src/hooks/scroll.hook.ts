import type { ActionType, ContextType, HookType } from "walker-shared";
import { WalkerError } from "../error";

export async function scroll(
  action: ActionType,
  ctx: ContextType,
): Promise<string | void> {
  console.log("[W][D]: Scroll Hook: ", action.itemId);
  if (action.itemId === "") {
    return;
  }

  const el = document.getElementById(action.itemId);
  const child = el?.firstElementChild;

  if (child instanceof HTMLElement) {
    child.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });

    // Wait element to be in the viewport
    await new Promise((resolve) => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            observer.disconnect();
            resolve(null);
          }
        },
        {
          threshold: 0.5,
        },
      );

      observer.observe(child);
    });

    // Wait for the element to stop moving
    await new Promise<void>((resolve) => {
      let lastTop = child.getBoundingClientRect().top;
      let stableFrames = 0;

      const check = () => {
        const top = child.getBoundingClientRect().top;

        if (Math.abs(top - lastTop) < 0.5) {
          stableFrames++;
        } else {
          stableFrames = 0;
        }

        lastTop = top;

        if (stableFrames >= 3) {
          resolve();
        } else {
          requestAnimationFrame(check);
        }
      };

      requestAnimationFrame(check);
    });
  } else {
    throw new WalkerError(
      `Scroll hook failed: No DOM element found for action.itemId: ${action.itemId}`,
    );
  }
}

export const scrollHook: HookType = {
  handler: scroll,
};
