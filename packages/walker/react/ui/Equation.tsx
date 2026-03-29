/**
 * EquationUI Component
 * Renders mathematical equations using KaTeX
 */

import React from "react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import type { ConverseItem } from "@shared/chat.schema";

interface EquationUIProps extends Pick<ConverseItem, "role"> {
	equation: string;
	inline?: boolean;
	className?: string;
}

export const EquationUI: React.FC<EquationUIProps> = ({
	equation,
	role,
	inline = false,
	className = "",
}) => {
	const isUser = role === "user";

	return (
		<div className={`py-2 ${isUser ? "ml-auto" : "mr-auto"} ${className}`}>
			{inline ? (
				<InlineMath math={equation} />
			) : (
				<div
					className={`p-4 rounded-lg overflow-x-auto max-w-sm ${
						isUser ? "bg-blue-50" : "bg-gray-50"
					}`}
				>
					<BlockMath math={equation} />
				</div>
			)}
		</div>
	);
};
