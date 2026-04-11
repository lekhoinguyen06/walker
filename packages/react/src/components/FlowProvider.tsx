import React, { useEffect } from "react";
import { initFlow } from "@repo/core";

console.log('Initializing flows inside file...');

export function FlowProvider({ children }: { children: React.ReactNode }) {
	console.log('Initializing flows inside FlowProvider...');

	useEffect(() => {
		console.log('Initializing flows inside useEffect...');
		initFlow();
	}, []);

	return <>{children}</>;
}