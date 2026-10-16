import { Command } from "commander";
import { setTab } from "./stores/tab.store";

const program = new Command();

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

export default program;
