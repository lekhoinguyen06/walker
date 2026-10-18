import { Command } from "commander";
import { setTab } from "./stores/tab.store";
import { renderer } from "./index";

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

program
  .command("debug")
  .description("Run Walker CLI with console logs panel")
  .action(() => {
    renderer.console.show();
  });

export default program;
