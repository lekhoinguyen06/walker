import type { ItemType } from "./map";

export const ObservedAttributes = [
  "id",
  "type",
  "description",
  "scope",
  "state",
  "refId",
  "content",
  "raw",
] as const;

export type ObservedAttributesType = (typeof ObservedAttributes)[number];

export interface WalkerElementProps<T = unknown> extends ItemType {
  children?: T;
}

export class WalkerElement extends HTMLElement {
  constructor(props: WalkerElementProps) {
    super();
  }

  static observedAttributes: readonly ObservedAttributesType[] =
    ObservedAttributes;

  // connectedCallback() {
  //   console.log("Custom element added to page.");
  // }

  // disconnectedCallback() {
  //   console.log("Custom element removed from page.");
  // }

  // connectedMoveCallback() {
  //   console.log("Custom element moved with moveBefore()");
  // }

  // adoptedCallback() {
  //   console.log("Custom element moved to new page.");
  // }

  // attributeChangedCallback() {}
}

customElements.define("walker-element", WalkerElement);
