import { message } from "./message";
import { scroll } from "./scroll";
import type { HooksType } from "./hook.dto";

/**
 * webFlows is a collection of hooks that are specific to web applications provided by the core library.
 */
export const webHooks: HooksType = {
  onMessage: message,
  onScroll: scroll,
};
