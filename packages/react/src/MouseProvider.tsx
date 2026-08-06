import type {
  MiddlewarePropsType,
  MiddlewareResponseType,
  MiddlewareType,
} from "@repo/core";
import { useMouseStore } from "./useMouseStore";

export function useMouseOffset() {
  return useMouseStore();
}

export async function mouseMiddlewareHandler(
  props: MiddlewarePropsType,
): MiddlewareResponseType {
  const { setX, setY } = useMouseStore.getState();

  const targetEl = document.querySelector(
    `walker-element#${props.action.target} > *`,
  );
  console.log("targetEl:", targetEl);

  if (targetEl) {
    const targetX = targetEl.getBoundingClientRect().x;
    const targetWidth = targetEl.getBoundingClientRect().width;
    const centerX = targetX + targetWidth / 2;
    const targetY = targetEl.getBoundingClientRect().y;
    const targetHeight = targetEl.getBoundingClientRect().height;
    const centerY = targetY + targetHeight / 2;

    setX(centerX);
    setY(centerY);
  }

  return;
}

export const mouseMiddleware: MiddlewareType = {
  name: "mouse",
  description: "Middleware to handle mouse movement in React",
  handler: mouseMiddlewareHandler,
};
