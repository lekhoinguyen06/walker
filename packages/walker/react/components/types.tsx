export interface Model {
	open: boolean;
	onClose: () => void;
}

export type Mode = "Dev" | "Chat";
export type Size = "Small" | "Full";
