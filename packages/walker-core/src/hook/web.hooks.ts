import type { WebHooksType } from "walker-shared";
import { message } from "./message";
import { mouse } from "./mouse";
import { scroll } from "./scroll";
import { mouseReturn } from "./mouseReturn";

/**
 * webFlows is a collection of hooks that are specific to web applications provided by the core library.
 */
export const webHooks: WebHooksType = {
  onMessage: message,
  onScroll: scroll,
  onMouse: mouse,
  onMouseReturn: mouseReturn,
};
