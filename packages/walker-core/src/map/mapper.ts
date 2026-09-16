import type { ContextType } from "../context/context.dto";
import { type ObservedAttributesType } from "../walk/walk.dto";
import { ItemSchema, type MapType } from "./map.dto";

function uniqueGuard(
  ctx: ContextType,
  set: Set<string>,
  val: string,
  msg: string,
) {
  if (set.has(val)) {
    ctx.logger.error({
      event: "Duplicate walker-element id",
      id: val,
    });
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

export function mapper(ctx: ContextType): MapType {
  const registry: MapType = {};
  const tree: MapType = {};
  const all = document.querySelectorAll("walker-element");
  const seenIds = new Set<string>();
  let seenScope = false;

  ctx.logger.trace("Enter mapper function");

  ctx.logger.debug({
    event: "Found walker-element elements",
    count: all.length,
  });

  // Build flat map
  all.forEach((el) => {
    let isRawEnabled = getAttr(el, "raw") == "";
    let isContentEnabled = getAttr(el, "content") == "";

    // Validation: raw attribute may only be set on leaf nodes (nodes without <walker-element> children)
    if (isRawEnabled) {
      const child = el.querySelector("walker-element");
      if (child) {
        ctx.logger.warn({
          event: `Invalid walker-element attributes at <walker-element> with id: ${getAttr(el, "id")}. The raw attribute may only be set on leaf nodes (nodes without <walker-element> children) and will be ignored for this element.`,
        });
        isRawEnabled = false;
      }
    }

    // Validation: content attribute may only be set on leaf nodes (nodes without <walker-element> children)
    if (isContentEnabled) {
      const child = el.querySelector("walker-element");
      if (child) {
        ctx.logger.warn({
          event: `Invalid walker-element attributes at <walker-element> with id: ${getAttr(el, "id")}. The content attribute may only be set on leaf nodes (nodes without <walker-element> children) and will be ignored for this element.`,
        });
        isContentEnabled = false;
      }
    }

    const item = ItemSchema.parse({
      id: getAttr(el, "id"),
      type: getAttr(el, "type"),
      description: getAttr(el, "description"),
      scope: getAttr(el, "scope") === "",
      isInActiveScope: el.closest("walker-element[scope]") ? true : false,
      state: getAttr(el, "state"),
      raw: isRawEnabled,
      content: isContentEnabled,
    });

    uniqueGuard(
      ctx,
      seenIds,
      item.id,
      "<walker-element> element must be unique. Found more than one <walker-element> elements with the same id attribute when generating map.",
    );

    if (item.type === "app") {
      uniqueGuard(
        ctx,
        seenIds,
        item.type,
        "There can only be one <walkeone <walker-element> element of type 'app'. Found more than one <walker-element> elements with the same 'app' type when rating map.",
      );
    }

    if (item.scope === true) {
      if (seenScope) {
        throw new Error(
          `Found multiple <walker-element> elements with arttribute scope when generating map. Only one <walker-element> element can have scope.`,
        );
      }
      seenScope = true;
    }

    registry[item.id] = {
      id: item.id,
      type: item.type,
      scope: item.scope,
      isInActiveScope: item.isInActiveScope,
      description: item.description,
      content: item.content,
      raw: item.raw,
      children: {},
      state: item.state,
      ...(isRawEnabled && { rawValue: el.innerHTML.trim() }),
      ...(isContentEnabled && { contentValue: el.textContent.trim() }),
    };
  });

  if (seenScope === false) {
    throw new Error(
      `There must be exactly one <walker-element> element with attribute scope. ${all.length} found.`,
    );
  }

  // Attach children
  all.forEach((el) => {
    const id = getRequiredAttr(el, "id", "Unreachable");
    const parentEl = el.parentElement?.closest(`walker-element`);

    if (parentEl) {
      const parentId = getRequiredAttr(parentEl, "id", "Unreachable");

      if (registry[parentId] && registry[parentId].children && registry[id]) {
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

  ctx.logger.debug({
    event: "Mapping done",
    map: tree,
  });

  return tree;
}
