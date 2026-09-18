import chalk from "chalk";
import { z } from "zod";

interface LoggerHandlerFactoryType {
  (config: string | Record<string, any>): void;
}

export const LoggerHandlerFactorySchema: z.ZodType<LoggerHandlerFactoryType> =
  z.function({
    input: [z.string().or(z.record(z.any(), z.any()))],
    output: z.void(),
  });

export interface LoggerType {
  trace: LoggerHandlerFactoryType;
  debug: LoggerHandlerFactoryType;
  info: LoggerHandlerFactoryType;
  warn: LoggerHandlerFactoryType;
  error: LoggerHandlerFactoryType;
}

export const LoggerSchema: z.ZodType<LoggerType> = z.object({
  trace: LoggerHandlerFactorySchema,
  debug: LoggerHandlerFactorySchema,
  info: LoggerHandlerFactorySchema,
  warn: LoggerHandlerFactorySchema,
  error: LoggerHandlerFactorySchema,
});

export enum LoggerLevel {
  TRACE = 0,
  DEBUG = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4,
}

export type LoggerLevelType = LoggerLevel;

export function getLogger(level: LoggerLevelType): LoggerType {
  return {
    trace: (msg) => {
      if (level <= LoggerLevel.TRACE) {
        console.log(chalk.bold("[WALKER]") + chalk.gray("[TRACE] "), msg);
      }
    },
    debug: (msg) => {
      if (level <= LoggerLevel.DEBUG) {
        console.log(chalk.bold("[WALKER]") + chalk.magenta("[DEBUG] "), msg);
      }
    },
    info: (msg) => {
      if (level <= LoggerLevel.INFO) {
        console.log(
          chalk.bold("[WALKER]") + chalk.magentaBright("[INFO] "),
          msg,
        );
      }
    },
    warn: (msg) => {
      if (level <= LoggerLevel.WARN) {
        console.warn(chalk.bold("[WALKER]") + chalk.yellow("[WARN] "), msg);
      }
    },
    error: (msg) => {
      if (level <= LoggerLevel.ERROR) {
        console.error(chalk.bold("[WALKER]") + chalk.red("[ERROR] "), msg);
      }
    },
  };
}
