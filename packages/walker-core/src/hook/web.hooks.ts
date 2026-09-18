import type { HookFactoryType } from "./hook.dto";
import { message } from "./message";
import { scroll } from "./scroll";

/**
 * webFlows is a collection of hooks that are specific to web applications provided by the core library.
 */
export const webHooks: WebHooksType = {
  onMessage: message,
  onScroll: scroll,
};

export interface WebHooksType {
  onScroll?: HookFactoryType;
  onMessage?: HookFactoryType;
  onMouse?: HookFactoryType;
}
