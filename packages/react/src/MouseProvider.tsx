import type { HookPropsType, HookFactory, HookResponseType } from "walker-core";
import { useMouseStore } from "./useMouseStore";

export function useMouseOffset() {
  return useMouseStore();
}

export async function mouse(props: HookPropsType): HookResponseType {
  const { setX, setY } = useMouseStore.getState();

  const walker = document.getElementById(props.action.target);
  const targetEl = walker?.firstElementChild;

  if (targetEl) {
    const rect = targetEl.getBoundingClientRect();
    console.log("Rect:", rect);

    const centerX = rect.x + rect.width / 2 + window.scrollX;
    const centerY = rect.y + rect.height / 2 + window.scrollY;

    setX(centerX);
    setY(centerY);
  }

  return;
}
