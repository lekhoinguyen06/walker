import type { Action } from "@/walker/src/types/action.types";
import { useActionStore } from "@/walker/src/store/action/useActionStore";
import { logger } from "@/walker/core";
import { useAppStore } from "../../store/app/useAppStore";

/**
 * Store and manage Actions
 */
export class ActionManager {
	addAction(action: Action) {
		useActionStore.getState().addAction(action);
	}

	listActionQueue(): Action[] | undefined {
		const actions = useActionStore.getState().actions;
		if (actions.length > 0) {
			logger.add("1", {
				identifier: 2,
				domain: "Action Manager",
				title: "Action Queue",
				data: actions,
			});
			logger.last();
			return actions;
		}
		return undefined;
	}

	listActionHistory(): Action[] | undefined {
		const history = useActionStore.getState().history;
		if (history.length > 0) {
			logger.add("1", {
				identifier: 3,
				domain: "Action Manager",
				title: "Action History",
				content: JSON.stringify(history),
			});
			logger.last();
			return history;
		}
		return undefined;
	}

	newActions(actions: Action[]) {
		for (const action of actions) {
			useActionStore.getState().addAction(action);
		}
	}

	nextAction(): Action | undefined {
		const isPaused = useAppStore.getState().getSettings().isPaused;
		if (isPaused) return undefined;
		const nextAction = useActionStore.getState().nextAction();
		return nextAction;
	}
}
