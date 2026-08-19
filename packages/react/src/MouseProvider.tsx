import type {
  HookPropsType,
  HookFactory,
  HookResponseType,
} from "@walker/core";
import { useMouseStore } from "./useMouseStore";

export function useMouseOffset() {
  return useMouseStore();
}

export async function mouse(props: HookPropsType): HookResponseType {
  const { setX, setY } = useMouseStore.getState();

  const walker = document.getElementById(props.action.target);
  const targetEl = walker?.firstElementChild;

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
