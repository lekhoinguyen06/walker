/**
 * Message Component
 * Displays a text message with proper formatting
 */
import type { ConverseItem } from "@shared/chat.schema";
import React from "react";

interface MessageProps extends Pick<ConverseItem, "role"> {
	content: string;
	timestamp?: Date;
	className?: string;
}

export const Message: React.FC<MessageProps> = ({
	content,
	role,
	timestamp,
	className = "",
}) => {
	const isUser = role === "user";

	return (
		<div
			className={`rounded-2xl px-4 py-3 ${
				isUser
					? "bg-blue-500 text-white rounded-br-sm ml-auto"
					: "bg-gray-100 text-gray-800 rounded-bl-sm mr-auto"
			} ${className}`}
		>
			<p className="text-sm whitespace-pre-wrap wrap-break-words">{content}</p>
			{timestamp && (
				<span className="text-xs opacity-70 mt-1 block">
					{timestamp.toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</span>
			)}
		</div>
	);
};
