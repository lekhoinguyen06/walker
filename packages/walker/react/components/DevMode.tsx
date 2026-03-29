import { walk, listActions, logMap, logPeak, app } from "@/walker/core";
import { ControlButtons } from "./ControlButtons";
import type { Mode, Size } from "./types";

interface DevModeProps {
	action: string;
	onActionChange: (action: string) => void;
	size: Size;
	onSizeChange: (size: Size) => void;
	onModeChange: (mode: Mode) => void;
	onClose: () => void;
}

export function DevMode({
	action,
	onActionChange,
	size,
	onSizeChange,
	onModeChange,
	onClose,
}: DevModeProps) {
	const { viewQueue, viewHistory } = listActions();

	return (
		<div className="relative z-10 p-6">
			<ControlButtons
				size={size}
				mode="Dev"
				onSizeChange={onSizeChange}
				onModeChange={onModeChange}
				onClose={onClose}
			/>

			<textarea
				onChange={(e) => onActionChange(e.target.value)}
				value={action}
				placeholder="Enter flow actions"
				className="w-full h-24 px-4 py-3 mb-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl placeholder-gray-600 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent resize-none transition-all duration-200"
			/>

			<div className="flex flex-wrap gap-3">
				<button
					className="flex-1 min-w-fit px-6 py-3 bg-blue-500/80 hover:bg-blue-600/80 backdrop-blur-sm text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
					onClick={() => walk(String(action))}
				>
					Execute
				</button>

				<button
					onClick={viewQueue}
					className="px-6 py-3 bg-white/50 hover:bg-white/70 backdrop-blur-sm text-gray-800 font-medium rounded-xl transition-all duration-200 border border-white/30"
				>
					Queue
				</button>

				<button
					onClick={viewHistory}
					className="px-6 py-3 bg-white/50 hover:bg-white/70 backdrop-blur-sm text-gray-800 font-medium rounded-xl transition-all duration-200 border border-white/30"
				>
					History
				</button>

				<button
					onClick={() => logMap()}
					className="px-6 py-3 bg-white/50 hover:bg-white/70 backdrop-blur-sm text-gray-800 font-medium rounded-xl transition-all duration-200 border border-white/30"
				>
					Map
				</button>

				<button
					onClick={() => logPeak()}
					className="px-6 py-3 bg-white/50 hover:bg-white/70 backdrop-blur-sm text-gray-800 font-medium rounded-xl transition-all duration-200 border border-white/30"
				>
					Peak
				</button>

				<button
					onClick={() => app.togglePause()}
					className="px-6 py-3 bg-white/50 hover:bg-white/70 backdrop-blur-sm text-gray-800 font-medium rounded-xl transition-all duration-200 border border-white/30"
				>
					Pause
				</button>

				<button
					onClick={() => console.clear()}
					className="px-6 py-3 bg-white/50 hover:bg-white/70 backdrop-blur-sm text-gray-800 font-medium rounded-xl transition-all duration-200 border border-white/30"
				>
					Clear
				</button>
			</div>
		</div>
	);
}
