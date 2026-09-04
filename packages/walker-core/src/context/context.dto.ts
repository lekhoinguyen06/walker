import z from "zod";
import { ConfigSchema } from "../config/config.dto";
import { LoggerSchema } from "../shared/utils/logger";

export const ContextSchema = z.object({
  config: ConfigSchema,
  logger: LoggerSchema,
});

export type ContextType = z.infer<typeof ContextSchema>;
