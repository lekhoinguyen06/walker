import { Command } from "commander";
import { setTab } from "./stores/tab.store";

export function initializeProgram() {
  const program = new Command();

  program
    .name("walker")
    .description("Walker CLI - A command line interface for Walker")
    .version("0.1.0")
    .option("-d, --debug", "Run Walker CLI with console logs panel");

  program
    .command("home", { isDefault: true })
    .description("Starting Walker CLI at home tab")
    .action(() => {
      setTab("home");
    });

  program
    .command("local")
    .description("Start a local Walker Server")
    .action(() => {
      setTab("local");
    });

  program
    .command("config")
    .description("Open the configuration settings for Walker CLI")
    .action(() => {
      setTab("config");
    });

  return program;
}
