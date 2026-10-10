import type { HookPropsType } from "walker-shared";

export async function message(props: HookPropsType): Promise<void> {
  alert(props.action.message);
}
