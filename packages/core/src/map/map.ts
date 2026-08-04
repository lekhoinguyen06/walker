import type { ItemType, MapType } from "./type";
import hash from "object-hash";

export function map(): MapType {
  const registry: Record<
    string,
    ItemType & { children: Record<string, ItemType> }
  > = {};
  const tree: Record<string, ItemType> = {};
  let Map: MapType = { map: {}, hash: "" };
  const all = document.querySelectorAll("walker-element");

  // Build flat map
  all.forEach((el) => {
    const key = el.getAttribute("key");
    if (!key) return;
    const description = el.getAttribute("description") || "";
    const content = el.innerHTML || "";

    registry[key] = {
      id: key,
      description,
      content,
      children: {},
    };
  });

  // Attach children
  all.forEach((el) => {
    const key = el.getAttribute("key");
    if (!key) return;

    const parentEl = el.parentElement?.closest("[key]");

    if (parentEl) {
      const parentKey = parentEl.getAttribute("key");
      if (parentKey && registry[parentKey] && registry[key]) {
        registry[parentKey].children[key] = registry[key];
      }
    }
  });

  // Return only root parent
  all.forEach((el) => {
    const key = el.getAttribute("key");
    if (!key) return;

    const parentEl = el.parentElement?.closest("[key]");
    if (!parentEl && registry[key]) {
      tree[key] = registry[key];
    }
  });

  // Hashing
  const map = {
    map: tree,
    hash: hash(tree),
  };

  return map;
}
