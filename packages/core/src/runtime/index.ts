import { ConfigSchema, type ConfigType } from "./type";

export class Runtime {
  private readonly config: ConfigType;
  constructor(config: ConfigType) {
    this.config = ConfigSchema.parse(config);
  }
}
