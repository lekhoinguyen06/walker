import type { FlowType } from "walker-shared";
import { clickFlow } from "./click.flow";
import { inputFlow } from "./input.flow";
import { noneFlow } from "./none.flow";

export const webFlows: FlowType[] = [clickFlow, inputFlow, noneFlow];
