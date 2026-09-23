import { registry } from "zod";
import type { ContextType } from "../context/context.dto";
import { type ObservedAttributesType } from "../walker-element";
import { MapItemSchema, type MapType } from "./map.dto";

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

function checkScope({
  el,
  registry,
}: {
  el: Element;
  registry: MapType;
}): boolean {
  const refId = getAttr(el, "refId");
  const parentEl = el.parentElement?.closest(`walker-element`);
  const parentId = parentEl ? getAttr(parentEl, "id") : null;
  if (refId) {
    return document.getElementById(refId)?.closest("walker-element[scope]")
      ? true
      : false;
  }

  // For Items in reference context where there ancestor is in the active scope
  // Note: rely on the fact that document.querySelectorAll("walker-element") returns elements depth-first, preorder traversal.
  if (parentId && registry[parentId]?.isInActiveScope) {
    return true;
  }
  return el.closest("walker-element[scope]") ? true : false;
}

export function map(ctx: ContextType): MapType {
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

    const item = MapItemSchema.parse({
      id: getAttr(el, "id"),
      type: getAttr(el, "type"),
      description: getAttr(el, "description"),
      scope: getAttr(el, "scope") === "",
      state: getAttr(el, "state"),
      refId: getAttr(el, "refId"),
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

    registry[item.id] = {
      id: item.id,
      type: item.type,
      description: item.description,
      scope: item.scope,
      isInActiveScope: checkScope({
        el,
        registry,
      }),
      refId: item.refId,
      content: item.content,
      raw: item.raw,
      children: {},
      state: item.state,
      ...(item.raw && { rawValue: el.innerHTML.trim() }),
      ...(item.content && { contentValue: el.textContent.trim() }),
    };

    if (item.scope === true) {
      if (seenScope) {
        throw new Error(
          `Found multiple <walker-element> elements with arttribute scope when generating map. Only one <walker-element> element can have scope.`,
        );
      }
      seenScope = true;
    }
  });

  if (seenScope === false) {
    throw new Error(
      `There must be exactly one <walker-element> element with attribute scope. ${all.length} found.`,
    );
  }

  // Attach children
  all.forEach((el) => {
    const id = getRequiredAttr(el, "id", "Unreachable");
    const refId = getAttr(el, "refId");
    const parentEl = refId
      ? document.getElementById(refId)
      : el.parentElement?.closest(`walker-element`);

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
    const refId = getAttr(el, "refId");
    const parentEl = el.parentElement?.closest(`walker-element`);

    if (!parentEl && registry[id] && !refId) {
      tree[id] = registry[id];
    }
  });

  ctx.logger.debug({
    event: "Mapping done",
    map: tree,
  });

  return tree;
}
