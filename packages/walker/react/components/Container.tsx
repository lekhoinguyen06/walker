import React from "react";
import type { Size } from "./types";

interface ContainerProps {
	size: Size;
	children: React.ReactNode;
}

export function Container({ size, children }: ContainerProps) {
	return (
		<div className="fixed bottom-0 left-0 right-0 h-screen z-50 p-4 pointer-events-none flex items-end">
			<div
				className={
					size === "Full"
						? "w-full pointer-events-auto"
						: "max-w-2xl w-full mx-auto pointer-events-auto"
				}
			>
				<div className="relative flex flex-col rounded-2xl border border-white/20 shadow-2xl backdrop-blur-xl bg-white/20">
					{/* <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent pointer-events-none" /> */}
					{/* <div className="flex-1 relative z-10" /> */}
					{children}
				</div>
			</div>
		</div>
	);
}
