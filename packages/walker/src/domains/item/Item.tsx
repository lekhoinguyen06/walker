import React from "react";
import type { ReactElement } from "react";
import { FlowContext } from "@/walker/src/store/item/useFlowItem";
import { useFlowStore } from "@/walker/src/store/flow/useFlowStore";

interface FlowComponent {
	children: React.ReactNode;
}

export function Item({ children }: FlowComponent) {
	const updateItem = useFlowStore((s) => s.updateItem);
	// const items = useFlowStore((s) => s.items)

	const enhancedChildren = React.Children.map(children, (child) => {
		// Return non-element child like a string
		if (!React.isValidElement(child)) return child;

		//
		const element = child as ReactElement<React.HTMLAttributes<HTMLElement>>;

		// Props validations
		const id = element.props.id;
		if (!id) return element;

		const newProps = {
			...element.props,
			onmouseenter: (e: React.MouseEvent<HTMLElement>) => {
				updateItem(id, "hovered");
				element.props.onMouseEnter?.(e);
			},
			onmouseleave: (e: React.MouseEvent<HTMLElement>) => {
				updateItem(id, "");
				element.props.onMouseLeave?.(e);
			},
		};

		return React.cloneElement(element, newProps);
	});

	return (
		<FlowContext.Provider value={useFlowStore}>
			{enhancedChildren}
		</FlowContext.Provider>
	);
}
