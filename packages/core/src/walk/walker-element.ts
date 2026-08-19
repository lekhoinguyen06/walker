import { ObservedAttributes } from "./walk.const";
import type { ItemType } from "../map/map.dto";

export interface WalkerElementProps<T = unknown> extends ItemType {
  children?: T;
}

export class WalkerElement extends HTMLElement {
  constructor(props: WalkerElementProps) {
    super();
  }

  static observedAttributes = ObservedAttributes;

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
