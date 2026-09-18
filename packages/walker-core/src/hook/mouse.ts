import type { HookPropsType } from "./hook.dto";

export async function mouse(props: HookPropsType): Promise<void> {
  const { setX, setY } = useMouseStore.getState();

  const walker = document.getElementById(props.action.targetId);
  const targetEl = walker?.firstElementChild;

  if (targetEl) {
    const rect = targetEl.getBoundingClientRect();

    const centerX = rect.x + rect.width / 2 + window.scrollX;
    const centerY = rect.y + rect.height / 2 + window.scrollY;

    setX(centerX);
    setY(centerY);
  } else {
    throw new Error("Item not found");
  }

  return;
}
