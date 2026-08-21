import { beforeEach, describe, expect, it, test } from "vitest";
import { mapper } from "./mapper";
import { Runtime } from "../runtime";
import type { ContextType } from "../context/context.dto";

function mockRuntime() {
  const runtime = new Runtime({
    config: {
      mode: "tailored",
      isLoading: false,
      gap: 400,
      verbose: false,
    },
    adapter: {
      actionStore: {
        pushBack: () => {},
        pushFront: () => {},
        popBack: () => undefined,
        popFront: () => undefined,
        list: () => [],
        clear: () => [],
      },
      historyStore: {
        pushBack: () => {},
        pushFront: () => {},
        popBack: () => undefined,
        popFront: () => undefined,
        list: () => [],
        clear: () => [],
      },
    },
    flows: new Map(),
    hooks: {},
  });

  return runtime;
}

function mockContext() {
  const runtime = mockRuntime();
  const ctx: ContextType = {
    config: runtime.getConfig(),
    logger: runtime.getLogger(),
  };
  return ctx;
}

describe("mapper", () => {
  const ctx = mockContext();

  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("maps an Walker Item", () => {
    document.body.innerHTML = `
      <walker-element
        id="my-app"
        type="app"
        scope="active"
        description="My app is nice."
      >
        <div></div>
      </walker-element>
    `;

    const result = mapper(ctx);

    expect(result).toEqual({
      "my-app": {
        id: "my-app",
        type: "app",
        scope: "active",
        description: "My app is nice.",
        state: null,
        children: {},
      },
    });
  });

  it("maps an Walker Item with raw and content", () => {
    document.body.innerHTML = `
      <walker-element
        id="my-app"
        type="app"
        scope="active"
        description="My app is nice."
        raw="true"
        content="true"
      >
        <div>Walk the web, walk the Earth!</div>
      </walker-element>
    `;

    const result = mapper(ctx);

    expect(result).toEqual({
      "my-app": {
        id: "my-app",
        type: "app",
        scope: "active",
        description: "My app is nice.",
        state: null,
        raw: true,
        content: true,
        rawValue: "<div>Walk the web, walk the Earth!</div>",
        contentValue: "Walk the web, walk the Earth!",
        children: {},
      },
    });
  });

  it("maps an Walker Item with nested raw and nested content", () => {
    document.body.innerHTML = `
      <walker-element
        id="my-app"
        type="app"
        scope="active"
        description="My app is nice."
        raw="true"
        content="true"
      >
        <div>
          <div>Walker</div>
          <div>Walk the web, walk the Earth!</div>
        </div>
      </walker-element>
    `;

    const result = mapper(ctx);

    expect(result).toEqual({
      "my-app": {
        id: "my-app",
        type: "app",
        scope: "active",
        description: "My app is nice.",
        state: null,
        raw: true,
        content: true,
        rawValue: `<div>
          <div>Walker</div>
          <div>Walk the web, walk the Earth!</div>
        </div>`,
        contentValue: `Walker
          Walk the web, walk the Earth!`,
        children: {},
      },
    });
  });

  it("maps nested Walker Items", () => {
    document.body.innerHTML = `
      <walker-element
        id="my-app"
        type="app"
        scope="active"
        description="My app is nice."
      >
        <walker-element
          id="page-1"
          type="page"
          scope="active"
          description="My page is nice."
        >
        </walker-element>
      </walker-element>
    `;

    const result = mapper(ctx);

    expect(result).toEqual({
      "my-app": {
        id: "my-app",
        type: "app",
        scope: "active",
        description: "My app is nice.",
        state: null,
        children: {
          "page-1": {
            id: "page-1",
            type: "page",
            scope: "active",
            description: "My page is nice.",
            state: null,
            children: {},
          },
        },
      },
    });
  });

  it("maps structed Walker Items", () => {
    document.body.innerHTML = `
      <walker-element
        id="my-app"
        type="app"
        scope="active"
        description="My app is nice."
      >
        <walker-element
          id="page-1"
          type="page"
          scope="active"
          description="My page is nice."
        >
          <walker-element
            id="item-1"
            type="item"
            scope="active"
            description="My item is nice."
          >
          </walker-element>
        </walker-element>
        <walker-element
          id="page-2"
          type="page"
          scope="active"
          description="My page is nice."
        >
        </walker-element>
      </walker-element>
    `;

    const result = mapper(ctx);

    expect(result).toEqual({
      "my-app": {
        id: "my-app",
        type: "app",
        scope: "active",
        description: "My app is nice.",
        state: null,
        children: {
          "page-1": {
            id: "page-1",
            type: "page",
            scope: "active",
            description: "My page is nice.",
            state: null,
            children: {
              "item-1": {
                id: "item-1",
                type: "item",
                scope: "active",
                description: "My item is nice.",
                state: null,
                children: {},
              },
            },
          },
          "page-2": {
            id: "page-2",
            type: "page",
            scope: "active",
            description: "My page is nice.",
            state: null,
            children: {},
          },
        },
      },
    });
  });

  it("should throw an error when there are more than two root Walker Items", () => {});

  it("should throw an error when there are more than one Walker Item of type 'app'", () => {});

  it("should throw an error when there are duplicate Walker Item ids", () => {});

  it("should throw an error when a Walker Item is missing required attributes", () => {});

  it("should throw an error when a non-leaf Walker Item is enabling the raw attribute", () => {});

  it("should throw an error when a non-leaf Walker Item is enabling the content attribute", () => {});
});
