import { map, walk } from "@/walker/core";
import { logger } from "@/walker/core";

/**
 * Observer function to send reactive events
 *
 * Purpose:
 * - To listen to hard navigation
 * - To listen to soft navigation
 */

// function notify(title: string) {
// 		logger.log();
// 		logger.add("1", {
// 			identifier: 0,
// 			domain: "Event",
// 			title: title,
// 			source: "Observer listeners",
// 		});
// 		map();
// 		walk();
// 	};

// Navigation framework adapters

export function observer() {
	// Listen to soft navigation that use popstate event
	window.addEventListener("popstate", () => {
		logger.log();
		logger.add("1", {
			identifier: 0,
			domain: "Event",
			title: "Soft navigation detected",
			source: "Observer listeners",
		});
		map();
		walk();
	});

	// Listen to hard navigation
	logger.log();
	logger.add("1", {
		identifier: 0,
		domain: "Event",
		title: "Hard navigation detected",
		source: "Observer listeners",
	});
	map();
	walk();
}

/**
 * Observer extra function to send reactive events when Action finished with nextAction
 */
export function notifyNextAction() {
	logger.log();
	logger.add("1", {
		identifier: 0,
		domain: "Event",
		title: "Next action triggered",
		source: "Observer listeners",
	});
	map();
	walk();
}
