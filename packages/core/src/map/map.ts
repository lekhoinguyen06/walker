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
    const id = el.getAttribute("id");
    if (!id) return;
    const description = el.getAttribute("description") || "";
    const content = el.innerHTML || "";

    registry[id] = {
      id: id,
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
        console.log(`Attaching child ${id} to parent ${parentId}`);
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
