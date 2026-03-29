import { useState } from "react";
import type { Model, Mode, Size } from "./types";
import { Container } from "./Container";
import { DevMode } from "./DevMode";
import { ChatMode } from "./ChatMode";
import Session from "./Session";

export function FlowCommand({ open, onClose }: Model) {
	const [action, setAction] = useState("");
	const [prompt, setPrompt] = useState("");
	const [status, setStatus] = useState("");
	const [mode, setMode] = useState<Mode>("Chat");
	const [size, setSize] = useState<Size>("Small");

	if (!open) return null;

	return (
		<Container size={size}>
			{mode === "Dev" ? (
				<div>
					<div className="h-120"></div>
					<DevMode
						action={action}
						onActionChange={setAction}
						size={size}
						onSizeChange={setSize}
						onModeChange={setMode}
						onClose={onClose}
					/>
				</div>
			) : (
				<div>
					<Session id="000" />
					<ChatMode
						id="000"
						status={status}
						onStatusChange={setStatus}
						prompt={prompt}
						onPromptChange={setPrompt}
						size={size}
						onSizeChange={setSize}
						onModeChange={setMode}
						onClose={onClose}
					/>
				</div>
			)}
		</Container>
	);
}
