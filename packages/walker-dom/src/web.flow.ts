import { clickFlow } from "./click.flow";
import { input } from "./input.flow";
import { none } from "./none.flow";
import type { Flow } from "./type";

export const webFlows: Flow<string>[] = [
  clickFlow,
  {
    command: "input",
    handler: input,
  },
  {
    command: "none",
    handler: () => none(),
  },
];
