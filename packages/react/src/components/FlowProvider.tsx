import React, { useEffect } from "react";

type FlowProviderProps = {
	initializer: () => void;
	children: React.ReactNode;
};

export function FlowProvider({ initializer, children }: FlowProviderProps) {
	useEffect(() => {
		initializer();
	}, [initializer]);

	return <>{children}</>;
}