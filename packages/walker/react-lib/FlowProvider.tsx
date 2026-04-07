import React, { useEffect } from "react";
import { initFlow } from "@core";

export function FlowProvider({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		initFlow();
	}, []);

	return <>{children}</>;
}