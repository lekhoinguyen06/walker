import type { AdapterType } from "./adapter.dto";
import { type ConfigType } from "./config.dto";
import type { FlowRegistry } from "./flow.dto";
import type { WebHooksType } from "./hook.dto";
import { type LoggerType } from "./logger.dto";

export interface ContextType {
  config: ConfigType;
  adapter: AdapterType;
  flows: FlowRegistry;
  hooks: WebHooksType;
  logger: LoggerType;
}
