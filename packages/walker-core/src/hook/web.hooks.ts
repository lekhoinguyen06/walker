import type { HookFactoryType } from "./hook.dto";
import { message } from "./message";
import { mouse } from "./mouse";
import { scroll } from "./scroll";

/**
 * webFlows is a collection of hooks that are specific to web applications provided by the core library.
 */
export const webHooks: WebHooksType = {
  onMessage: message,
  onScroll: scroll,
  onMouse: mouse,
};

export interface WebHooksType {
  onScroll?: HookFactoryType;
  onMessage?: HookFactoryType;
  onMouse?: HookFactoryType;
}
