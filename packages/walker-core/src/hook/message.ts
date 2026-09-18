import type { HookPropsType } from "./hook.dto";

export async function message(props: HookPropsType): Promise<void> {
  alert(props.action.message);
}
