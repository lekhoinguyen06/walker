import type { MapType } from "walker-shared";

export function mapper(): MapType {
  return Array.from(document.querySelectorAll('[id^="walker-"]')).map((el) => ({
    id: el.id,
    description: el.getAttribute("data-description") ?? undefined,
    state: el.getAttribute("data-state") ?? undefined,
    flows: (() => {
      const flowsAttr = el.getAttribute("data-flows");
      if (!flowsAttr) return [];
      try {
        return JSON.parse(flowsAttr);
      } catch (error) {
        console.error("Error parsing data-flows attribute:", error);
        return [];
      }
    })(),
  }));
}
