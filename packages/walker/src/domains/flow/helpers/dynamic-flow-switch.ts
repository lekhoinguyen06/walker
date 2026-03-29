import type { Flow } from "@/walker/src/types/flow.types";
import type { Action } from "@/walker/src/types/action.types";
import { logger } from "@/walker/core";
import { initFlow } from "@/walker/core";

type SwitchArgs = {
	flows: Flow[];
	action: Action;
};

/**
 * A function to filter and execute flows
 * @param {SwitchArgs} args
 */
export async function dynamicFlowSwitch({ flows, action }: SwitchArgs) {
	// Reboot agentFlow in case singleton is missing
	if (flows.length == 0) initFlow();

	let filteredFlow = flows;
	if (action.currentRoute) {
		filteredFlow = flows.filter(
			(flow) => flow.route == action.currentRoute || flow.route == "*",
		);
	}
	for (const flow of filteredFlow) {
		// Action matcher
		if (flow.action == action.action) {
			await flow.handler({ action });

			logger.add("1", {
				identifier: 1,
				domain: "Action",
				title: "Called flow",
				source: "dynamicSwitch",
				data: flow,
			});
			return;
		}
	}
	// Default case
	logger.add("1", {
		identifier: 1,
		domain: "Action",
		title: "Cannot call flow",
		source: "dynamicFlowSwitch",
		content: "No matching flow found.",
	});

	// Add Action error & status handling (if call successfully, failed, or haven't called) below
}
