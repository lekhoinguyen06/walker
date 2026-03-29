import type { Action } from "./action.types";

export type handlerParam = {
	action: Action;
	gap?: number;
};

export interface Flow {
	action: string;
	description: string;
	// data: string;
	route: string;
	handler: (args: handlerParam) => void;
}
