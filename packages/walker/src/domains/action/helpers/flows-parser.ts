import { FLOW_PARSE_DELIMETERS } from "@/walker/src/constants/flow.constants";
import { ActionSchema, type Action } from "@/walker/src/types/action.types";
import { logger } from "@/walker/core";

/**
 * Compile flows
 * @param string
 * @returns Action[]
 */
export function flowsParser(command?: string): Action[] {
	if (!command) return [];

	const flows = command
		?.split(FLOW_PARSE_DELIMETERS.FLOW_SPLIT)
		.filter(Boolean);

	const actions = flows?.map((flow) => {
		const [actionString, restString] = flow.split(FLOW_PARSE_DELIMETERS.PARAM);
		const action: Action = {
			id: crypto.randomUUID(),
			action: actionString.trim(),
			message: "",
			data: "",
			query: "",
			currentRoute: "",
			currentURL: "",
		};

		if (restString) {
			const pairs = restString.split(FLOW_PARSE_DELIMETERS.ATTR_SPLIT);

			for (const pair of pairs) {
				const [key, value] = pair.split(FLOW_PARSE_DELIMETERS.ATTR);
				if (key && value) {
					(action as Record<keyof Action, string | undefined>)[
						key as keyof Action
					] = decodeURIComponent(value);
				}
			}
		}

		logger.add("1", {
			identifier: 1,
			domain: "Parser",
			title: "Action object",
			content: JSON.stringify(action),
		});

		// Validation
		ActionSchema.safeParse(action);

		return action;
	});
	return actions;
}
