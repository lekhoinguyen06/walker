import { messageMiddleware } from "./message";
import { scrollMiddleware } from "./scroll";
import type { MiddlewaresType } from "./type";

export const webMiddlewares: MiddlewaresType = new Map([
  ["scroll", scrollMiddleware],
  ["message", messageMiddleware],
]);
