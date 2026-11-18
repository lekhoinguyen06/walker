import { type MapType } from "walker-shared";
import z from "zod";

export function mapper(): MapType {
  return Array.from(document.querySelectorAll('[id^="walker-"]')).map((el) => ({
    id: el.id,
    description: el.getAttribute("data-description") ?? undefined,
    state: el.getAttribute("data-state") ?? undefined,
    flows: (() => {
      const flowsAttr = el.getAttribute("data-flows");
      if (!flowsAttr) return [];
      try {
        return z.array(z.string()).parse(JSON.parse(flowsAttr));
      } catch (error) {
        console.error("Error parsing data-flows attribute:", error);
        return [];
      }
    })(),
  }));
}

export function getUniqueFlowsFromMap(map: MapType): Set<string> {
  const uniqueFlowKeys: Set<string> = new Set(["none"]);
  for (const item of map) {
    for (const flowKey of item.flows ?? []) {
      uniqueFlowKeys.add(flowKey);
    }
  }
  return uniqueFlowKeys;
}
