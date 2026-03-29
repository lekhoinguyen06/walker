/**
 * FileUI Component
 * Displays a file icon with name as a clickable link
 */

import React from "react";
import { FileText, File, Image, Archive, Video, Music } from "lucide-react";

interface FileUIProps {
	fileName: string;
	url: string;
	className?: string;
}

// Helper function to get appropriate icon based on file extension
const getFileIcon = (fileName: string) => {
	const extension = fileName.split(".").pop()?.toLowerCase();

	switch (extension) {
		case "pdf":
		case "doc":
		case "docx":
		case "txt":
			return FileText;
		case "jpg":
		case "jpeg":
		case "png":
		case "gif":
		case "svg":
			return Image;
		case "zip":
		case "rar":
		case "7z":
			return Archive;
		case "mp4":
		case "avi":
		case "mov":
			return Video;
		case "mp3":
		case "wav":
		case "flac":
			return Music;
		default:
			return File;
	}
};

export const FileUI: React.FC<FileUIProps> = ({
	fileName,
	url,
	className = "",
}) => {
	const Icon = getFileIcon(fileName);

	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className={`inline-flex items-center gap-2 px-4 py-3 bg-cream-50 hover:bg-cream-100 
                  rounded-lg border border-cream-200 transition-colors group ${className}`}
		>
			<Icon className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
			<span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
				{fileName}
			</span>
		</a>
	);
};
