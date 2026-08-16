import type { HookPropsType, HookResponseType } from "./type";

export async function scroll(props: HookPropsType): HookResponseType {
  const element = document.querySelector(
    `walker-element#${props.action.target} > *`,
  );
  if (element instanceof HTMLElement) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}
