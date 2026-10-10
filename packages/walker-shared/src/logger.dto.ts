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
