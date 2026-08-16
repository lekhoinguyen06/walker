import type { HookPropsType, HookResponseType } from "./type";

export async function scroll(props: HookPropsType): HookResponseType {
  const walker = document.getElementById(props.action.target);
  const element = walker?.firstElementChild;

  if (element instanceof HTMLElement) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}
