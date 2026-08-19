import { JSDOM } from "jsdom";
import { beforeEach, describe, expect, it, test } from "vitest";
import { mapper } from "./mapper";

describe("mapper", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("maps an Walker Item", () => {
    document.body.innerHTML = `
      <walker-element
        id="my-app"
        type="app"
        description="My app is nice."
      >
        <div></div>
      </walker-element>
    `;

    const result = mapper();

    console.log("result", result);
    expect(result).toEqual({
      "my-app": {
        id: "my-app",
        type: "app",
        description: "My app is nice.",
        content: "",
        state: null,
        raw: "<div></div>",
        children: {},
      },
    });
  });
});
