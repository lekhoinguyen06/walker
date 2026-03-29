import { FLOW_GAP_DEFAULT_TIME } from "@/walker/src/constants/flow.constants";
import { wait } from "@/walker/src/utils/wait";

let mouseEl: HTMLImageElement | null = null;

export function createMouse() {
	// Reuse existing mouse
	if (mouseEl) return mouseEl;

	const existing = document.getElementById(
		"virtual-mouse",
	) as HTMLImageElement | null;
	if (existing) {
		mouseEl = existing;
		return existing;
	}

	const img = document.createElement("img");
	img.src = "/FootRight.svg";
	img.id = "virtual-mouse";

	Object.assign(img.style, {
		position: "fixed",
		left: "50%",
		top: "50%",
		width: "12px",
		height: "12px",
		transform: "translate(-50%, -50%)",
		transition: "left 0.6s ease, top 0.6s ease",
		opacity: "0",
		pointerEvents: "none",
		zIndex: "9999",
	});

	document.body.appendChild(img);
	mouseEl = img;

	return img;
}

export async function moveMouseTo(query: string) {
	const mouse = document.getElementById("virtual-mouse") as HTMLElement;
	const target = document.querySelector(query);

	if (!mouse || !target) return;

	const rect = target.getBoundingClientRect();

	mouse.style.opacity = "1";
	await wait(FLOW_GAP_DEFAULT_TIME);

	mouse.style.left = `${rect.left + rect.width / 2}px`;
	mouse.style.top = `${rect.top + rect.height / 2}px`;

	await wait(FLOW_GAP_DEFAULT_TIME);
	mouse.style.opacity = "0";

	mouse.style.left = `${window.innerWidth / 2}px`;
	mouse.style.top = `${window.innerHeight / 2}px`;
}
