import type { MapType } from "walker-shared";

export function mapper(): MapType {
  return Array.from(document.querySelectorAll('[id^="walker-"]')).map((el) => ({
    id: el.id,
    description: el.getAttribute("data-description") ?? undefined,
    state: el.getAttribute("data-state") ?? undefined,
  }));
}
