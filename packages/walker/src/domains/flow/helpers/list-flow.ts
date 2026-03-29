import { flowManager } from "@/walker/core";
import type { Flow } from "@/walker/src/types/flow.types";

/**
 * Query flows
 * @param string (optional) Specify URL path to list all available flows in the current route, use "*" to list all flows.
 * @returns Flow[]
 */
export function listFlows(currentRoute?: string): Flow[] {
	return flowManager.list(currentRoute);
}
