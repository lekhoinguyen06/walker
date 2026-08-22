import type { FlowsType } from "../flow.dto";
import { clickFlow } from "./click.flow";
import { inputFlow } from "./input.flow";

export const webFlows: FlowsType = [inputFlow, clickFlow];
