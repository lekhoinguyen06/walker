import React, { useRef, useEffect } from "react";
import type { ChatUI, ChatItem } from "@shared/chat.schema";
import { Message } from "./Message";
import { ImageUI } from "./Image";
import { EquationUI } from "./Equation";
import { CodeUI } from "./Code";

interface ChatboxProps {
	messages: ChatUI;
	className?: string;
}

export const Chatbox: React.FC<ChatboxProps> = ({
	messages,
	className = "",
}) => {
	const bottomRef = useRef<HTMLDivElement>(null);

	// Auto-scroll to bottom when new messages arrive
	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	// Render individual chat item based on type
	const renderChatItem = (item: ChatItem) => {
		const isUser = item.role === "user";
		const alignmentClass = isUser ? "flex justify-end" : "flex justify-start";
		const containerClass = isUser ? "max-w-[80%]" : "max-w-[80%]";

		let content;
		switch (item.type) {
			case "message":
				content = (
					<Message key={item.id} content={item.content} role={item.role} />
				);
				break;

			case "code": {
				// Assuming content format: "language:code" or just code
				const [language, ...codeParts] = item.content.includes(":")
					? item.content.split(":")
					: ["javascript", item.content];
				const code = codeParts.join(":");
				content = (
					<CodeUI
						key={item.id}
						code={code}
						language={language}
						role={item.role}
					/>
				);
				break;
			}

			case "image":
				// Content is the image URL
				content = <ImageUI key={item.id} url={item.content} role={item.role} />;
				break;

			case "equation":
				// Content is the LaTeX equation
				content = (
					<EquationUI key={item.id} equation={item.content} role={item.role} />
				);
				break;

			default:
				return null;
		}

		return (
			<div key={item.id} className={alignmentClass}>
				<div className={containerClass}>{content}</div>
			</div>
		);
	};

	return (
		<div className={`flex flex-col h-full w-full ${className}`}>
			<div className="flex-1 overflow-y-auto space-y-4 p-4">
				{messages.map(renderChatItem)}
				<div ref={bottomRef} />
			</div>
		</div>
	);
};
