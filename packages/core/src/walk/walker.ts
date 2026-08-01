class Walker extends HTMLElement {
  constructor() {
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

  attributeChangedCallback(key, type, description) {
    console.log({
      key,
      type,
      description,
    });
  }
}

customElements.define("walker", Walker);
