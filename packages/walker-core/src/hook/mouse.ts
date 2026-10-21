import type { HookPropsType } from "walker-shared";

export async function mouse(props: HookPropsType): Promise<void> {
  const { setX, setY } = props.context.adapter.mouseStore;

  const walker = document.getElementById(props.action.targetId);
  const targetEl = walker?.firstElementChild;

  if (!targetEl) {
    throw new Error("Item not found");
  }

  const rect = targetEl.getBoundingClientRect();

  setX(rect.left + rect.width / 2);
  setY(rect.top + rect.height / 2);
}
