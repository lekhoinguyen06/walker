import { ControlButtons } from "./ControlButtons";
import type { Mode, Size } from "./types";
import { useSession } from "./useSession";

interface ChatModeProps {
	id: string;
	status: string;
	onStatusChange: (status: string) => void;
	prompt: string;
	onPromptChange: (prompt: string) => void;
	size: Size;
	onSizeChange: (size: Size) => void;
	onModeChange: (mode: Mode) => void;
	onClose: () => void;
}

export function ChatMode({
	id,
	status,
	onStatusChange,
	prompt,
	onPromptChange,
	size,
	onSizeChange,
	onModeChange,
	onClose,
}: ChatModeProps) {
	const { send, deleteSession } = useSession(id);
	return (
		<div className="relative z-10 p-6">
			<ControlButtons
				size={size}
				mode="Chat"
				onSizeChange={onSizeChange}
				onModeChange={onModeChange}
				onClose={onClose}
			/>

			<textarea
				onChange={(e) => onStatusChange(e.target.value)}
				placeholder="Walker statusbar ..."
				value={status}
				className="w-full h-12 px-4 py-3 mb-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl placeholder-gray-600 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent resize-none transition-all duration-200"
			/>

			<textarea
				onChange={(e) => onPromptChange(e.target.value)}
				value={prompt}
				placeholder="Ask me: Show me all the products"
				className="w-full h-24 px-4 py-3 mb-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl placeholder-gray-600 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent resize-none transition-all duration-200"
			/>

			<div className="flex flex-wrap gap-3">
				<button
					onClick={() => send(prompt)}
					className="flex-1 min-w-fit px-6 py-3 bg-blue-500/80 hover:bg-blue-600/80 backdrop-blur-sm text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
				>
					Send
				</button>
				<button
					onClick={() => deleteSession()}
					className="flex-1 min-w-fit px-6 py-3 bg-blue-500/80 hover:bg-blue-600/80 backdrop-blur-sm text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
				>
					Delete
				</button>
			</div>
		</div>
	);
}
