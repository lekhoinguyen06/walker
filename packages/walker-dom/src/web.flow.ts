import { clickFlow } from "./click.flow";
import { inputFlow } from "./input.flow";
import { noneFlow } from "./none.flow";
import type { Flow } from "./type";

export const webFlows: Flow[] = [clickFlow, inputFlow, noneFlow];
