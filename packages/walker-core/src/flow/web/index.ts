import type { FlowRegistry } from "../flow.dto";
import { clickFlow } from "./click.flow";
import { inputFlow } from "./input.flow";

export * from "./click.flow";
export * from "./input.flow";
export * from "./none.flow";

export const webFlows: FlowRegistry = new Map([
  [clickFlow.command, clickFlow],
  [inputFlow.command, inputFlow],
]);
