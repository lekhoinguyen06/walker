import type { Flow } from "@/walker/src/types/flow.types";
import { logger } from "@/walker/core";

/**
 * Actions AI can take on client browser
 */
export class FlowManager {
	flows: Flow[] = [];

	add(flow: Flow) {
		this.flows.push(flow);
	}

	list(currentRoute?: string) {
		if (currentRoute && currentRoute != "*") {
			const filtered = this.flows.filter(
				(flow) => flow.route == currentRoute || flow.route == "*",
			);
			logger.add("1", {
				identifier: 4,
				domain: "Flow Manager",
				title: `Listing flows for route: ${currentRoute}`,
				content: JSON.stringify(filtered),
			});
			return filtered;
		}

		// console.log("Listing all flows:");
		// console.log(this.flows);
		return this.flows;
	}
}
