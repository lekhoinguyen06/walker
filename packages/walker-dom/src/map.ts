import type { Map } from "./type";

export function mapper(): Map {
  const items = Array.from(document.querySelectorAll('[id^="walker-"]')).map(
    (el) => ({
      id: el.getAttribute("id"),
      state: JSON.parse(el.getAttribute("data-state") ?? "{}"),
      scope: el.getAttribute("data-scope"),
    }),
  );

  return items as Map;
}
