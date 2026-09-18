import { type ConfigType } from "../config";
import type { WebHooksType } from "../hook";
import { type LoggerType } from "../shared/utils/logger";

export interface ContextType {
  config: ConfigType;
  logger: LoggerType;
}

export interface ContextWithHook extends ContextType {
  hooks: WebHooksType;
}
