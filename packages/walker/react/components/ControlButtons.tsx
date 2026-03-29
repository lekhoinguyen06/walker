import type { Size, Mode } from "./types";

interface ControlButtonsProps {
	size: Size;
	mode: Mode;
	onSizeChange: (size: Size) => void;
	onModeChange: (mode: Mode) => void;
	onClose: () => void;
}

export function ControlButtons({
	size,
	mode,
	onSizeChange,
	onModeChange,
	onClose,
}: ControlButtonsProps) {
	return (
		<div className="flex justify-end gap-2 mb-4">
			{size === "Full" ? (
				<button
					onClick={() => onSizeChange("Small")}
					className="w-4 h-4 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200 text-gray-700"
					aria-label="Minimize"
				>
					<svg
						className="w-2 h-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</button>
			) : (
				<button
					onClick={() => onSizeChange("Full")}
					className="w-4 h-4 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200 text-gray-700"
					aria-label="Expand"
				>
					<svg
						className="w-2 h-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
						/>
					</svg>
				</button>
			)}

			<div
				className="w-4 h-4 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200 text-gray-700 cursor-pointer"
				onClick={() => onModeChange(mode === "Dev" ? "Chat" : "Dev")}
			>
				<svg
					className="w-2 h-2"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					{mode === "Dev" ? (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
						/>
					) : (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
						/>
					)}
				</svg>
			</div>

			<button
				onClick={onClose}
				className="w-4 h-4 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200 text-gray-700"
				aria-label="Close"
			>
				<svg
					className="w-2 h-2"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>
	);
}
