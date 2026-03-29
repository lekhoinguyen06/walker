/**
 * CodeblockUI Component
 * Renders code with syntax highlighting using react-syntax-highlighter
 */

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";
import type { ConverseItem } from "@shared/chat.schema";

interface CodeblockUIProps extends Pick<ConverseItem, "role"> {
	code: string;
	language?: string;
	className?: string;
}

export const CodeUI: React.FC<CodeblockUIProps> = ({
	code,
	language = "javascript",
	role,
	className = "",
}) => {
	const [copied, setCopied] = useState(false);
	const isUser = role === "user";

	const handleCopy = async () => {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div
			className={`relative rounded-lg overflow-hidden ${
				isUser ? "bg-blue-50 ml-auto" : "bg-gray-50 mr-auto"
			} ${className}`}
		>
			{/* Header with language and copy button */}
			<div
				className={`flex items-center justify-between px-4 py-2 border-b ${
					isUser ? "bg-blue-100 border-blue-200" : "bg-gray-100 border-gray-200"
				}`}
			>
				<span className="text-xs font-medium text-gray-600">{language}</span>
				<button
					onClick={handleCopy}
					className={`p-1 rounded transition-colors ${
						isUser ? "hover:bg-blue-200" : "hover:bg-gray-200"
					}`}
					title={copied ? "Copied!" : "Copy code"}
				>
					{copied ? (
						<Check className="w-4 h-4 text-green-600" />
					) : (
						<Copy className="w-4 h-4 text-gray-600" />
					)}
				</button>
			</div>

			{/* Code content */}
			<SyntaxHighlighter
				language={language}
				style={oneLight}
				customStyle={{
					margin: 0,
					padding: "1rem",
					background: isUser ? "#dbeafe" : "#f9fafb",
					fontSize: "0.875rem",
				}}
			>
				{code}
			</SyntaxHighlighter>
		</div>
	);
};
