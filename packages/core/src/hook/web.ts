import { message } from "./message";
import { scroll } from "./scroll";
import type { HooksType } from "./type";

export const webHooks: HooksType = {
  onMessage: message,
  onScroll: scroll,
};
