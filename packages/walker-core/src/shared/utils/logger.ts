import chalk from "chalk";
import {
  LoggerLevel,
  type LoggerLevelType,
  type LoggerType,
} from "walker-shared";

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
