import type { HookPropsType, HookResponseType } from "./hook.dto";

export async function message(props: HookPropsType): HookResponseType {
  alert(props.action.message);
}
