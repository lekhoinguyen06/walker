export interface WalkerElementProps<T = unknown> {
  id: string;
  type: string;
  description: string;
  scope?: "active" | "inactive";
  value?: string;
  children?: T;
}

export class WalkerElement extends HTMLElement {
  constructor(props: WalkerElementProps) {
    super();
  }

  static observedAttributes = ["id", "type", "description", "scope", "value"];

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
