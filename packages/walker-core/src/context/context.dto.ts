import type { AdapterType } from "../adapter/adapter.dto";
import { type ConfigType } from "../config";
import type { FlowRegistry } from "../flow";
import type { WebHooksType } from "../hook";
import { type LoggerType } from "../shared/utils/logger";

export interface ContextType {
  config: ConfigType;
  adapter: AdapterType;
  flows: FlowRegistry;
  hooks: WebHooksType;
  logger: LoggerType;
}
