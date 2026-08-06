import { wait } from "../shared/utils/wait";
import type {
  MiddlewarePropsType,
  MiddlewareResponseType,
  MiddlewareType,
} from "./type";

async function scroll(props: MiddlewarePropsType): MiddlewareResponseType {
  await wait(1000);
  const element = document.querySelector(
    `walker-element #${props.action.target} > *`,
  );
  if (element instanceof HTMLElement) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

export const scrollMiddleware: MiddlewareType = {
  name: "scroll",
  description: "Scrolls an element into view.",
  handler: scroll,
};
