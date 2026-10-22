import type { HookPropsType } from "walker-shared";
import { wait } from "../shared/utils/wait";

export async function mouseReturn(props: HookPropsType): Promise<void> {
  if (!props.context.config.loop || props.action.end) {
    const gap = props.context.config.gap;
    await props.context.hooks.onMouse?.({
      ...props,
      action: {
        ...props.action,
        targetId: "mouse-container",
      },
    });
    await wait(gap > 1000 ? gap : 1000);
  }
}
