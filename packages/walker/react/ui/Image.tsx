/**
 * ImageUI Component
 * Renders an image from a URL with loading state and error handling
 */

import type { ConverseItem } from "@shared/chat.schema";
import React, { useState } from "react";

interface ImageUIProps extends Pick<ConverseItem, "role"> {
	url: string;
	alt?: string;
	className?: string;
}

export const ImageUI: React.FC<ImageUIProps> = ({
	url,
	role,
	alt = "Image",
	className = "",
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const isUser = role === "user";

	return (
		<div
			className={`relative rounded-lg overflow-hidden ${
				isUser ? "ml-auto" : "mr-auto"
			} ${className}`}
		>
			{isLoading && (
				<div
					className={`absolute inset-0 animate-pulse flex items-center justify-center ${
						isUser ? "bg-blue-100" : "bg-gray-100"
					}`}
				>
					<span className="text-sm text-gray-400">Loading...</span>
				</div>
			)}
			{hasError ? (
				<div
					className={`p-4 rounded-lg text-center text-sm text-gray-500 ${
						isUser ? "bg-blue-100" : "bg-gray-100"
					}`}
				>
					Failed to load image
				</div>
			) : (
				<img
					src={url}
					alt={alt}
					className="w-full h-auto max-w-sm rounded-lg"
					onLoad={() => setIsLoading(false)}
					onError={() => {
						setIsLoading(false);
						setHasError(true);
					}}
				/>
			)}
		</div>
	);
};
