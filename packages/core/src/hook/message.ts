import type { HookPropsType, HookResponseType } from "./type";

export async function message(props: HookPropsType): HookResponseType {
  alert(props.action.message);
}
