import type { ItemType, MapType } from "./type";
import hash from "object-hash";

export function mapper(): MapType {
  const registry: MapType["map"] = {};
  const tree: MapType["map"] = {};
  const all = document.querySelectorAll("walker-element");

  // Build flat map
  all.forEach((el) => {
    const id = el.getAttribute("id");
    if (!id) return;
    const type = el.getAttribute("type") || "";
    const description = el.getAttribute("description") || "";
    const content = el.textContent || "";

    registry[id] = {
      id: id,
      type,
      description,
      content,
      children: {},
    };
  });

  // Attach children
  all.forEach((el) => {
    const id = el.getAttribute("id");

    if (!id) return;

    const parentEl = el.parentElement?.closest(`walker-element`);

    if (parentEl) {
      const parentId = parentEl.getAttribute("id");
      if (parentId && registry[parentId] && registry[id]) {
        registry[parentId].children[id] = registry[id];
      }
    }
  });

  // Return only root parent
  all.forEach((el) => {
    const id = el.getAttribute("id");
    if (!id) return;

    const parentEl = el.parentElement?.closest(`walker-element`);
    if (!parentEl && registry[id]) {
      tree[id] = registry[id];
    }
  });

  // Hashing
  const map = {
    map: tree,
    hash: hash(tree),
  };

  return map;
}
