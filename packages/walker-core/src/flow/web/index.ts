import type { FlowRegistry } from "walker-shared";
import { clickFlow } from "./click.flow";
import { inputFlow } from "./input.flow";
import { noneFlow } from "./none.flow";

export * from "./click.flow";
export * from "./input.flow";
export * from "./none.flow";

export const webFlows: FlowRegistry = new Map([
  [clickFlow.command, clickFlow],
  [inputFlow.command, inputFlow],
  [noneFlow.command, noneFlow],
]);
