export interface WalkerElementProps {
  key: string;
  type: string;
  description: string;
}

export class WalkerElement extends HTMLElement {
  constructor(props: WalkerElementProps) {
    super();
  }

  static observedAttributes = ["key", "type", "description"];

  connectedCallback() {
    console.log("Custom element added to page.");
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
  }

  connectedMoveCallback() {
    console.log("Custom element moved with moveBefore()");
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }

  attributeChangedCallback(key: string, type: string, description: string) {
    console.log({
      key,
      type,
      description,
    });
  }
}

customElements.define("walker", WalkerElement);
