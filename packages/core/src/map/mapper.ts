import { type ObservedAttributesType } from "../walk/walk.dto";
import { ItemSchema, type MapType } from "./map.dto";

function uniqueGuard(set: Set<string>, val: string, msg: string) {
  if (set.has(val)) {
    throw Error(msg);
  }
  set.add(val);
}

function getAttr(el: Element, attr: ObservedAttributesType): string | null {
  return el.getAttribute(attr);
}

function getRequiredAttr(
  el: Element,
  attr: ObservedAttributesType,
  msg?: string,
): string {
  const val = el.getAttribute(attr);

  if (!val) {
    throw new Error(
      msg ? msg : `Element ${el.tagName} require the ${attr} attribute.`,
    );
  }

  return val;
}

export function mapper(): MapType {
  const registry: MapType = {};
  const tree: MapType = {};
  const all = document.querySelectorAll("walker-element");
  const seenIds = new Set<string>();

  // Build flat map
  all.forEach((el) => {
    const item = ItemSchema.parse({
      id: getAttr(el, "id"),
      type: getAttr(el, "type"),
      description: getAttr(el, "description"),
      scope: getAttr(el, "scope"),
      state: getAttr(el, "state"),
      // raw: el.innerHTML.trim(),
      // content: el.textContent.trim(),
    });

    uniqueGuard(
      seenIds,
      item.id,
      "<walker-element> element must be unique. Found more than one <walker-element> elements with the same id attribute when generating map.",
    );

    registry[item.id] = {
      id: item.id,
      type: item.type,
      description: item.description,
      content: item.content,
      state: item.state,
      raw: item.raw,
      children: {},
    };
  });

  // Attach children
  all.forEach((el) => {
    const id = getRequiredAttr(el, "id", "Unreachable");
    const parentEl = el.parentElement?.closest(`walker-element`);

    if (parentEl) {
      const parentId = getRequiredAttr(parentEl, "id", "Unreachable");
      if (registry[parentId] && registry[id]) {
        registry[parentId].children[id] = registry[id];
      }
    }
  });

  // Return only root parent
  all.forEach((el) => {
    const id = getRequiredAttr(el, "id", "Unreachable");
    const parentEl = el.parentElement?.closest(`walker-element`);

    if (!parentEl && registry[id]) {
      tree[id] = registry[id];
    }
  });

  return tree;
}
