import { beforeEach, describe, expect, it, test } from "vitest";
import { mapper } from "./mapper";
import { Runtime } from "../runtime";
import type { ContextType } from "../context/context.dto";
import { mockItem } from "./map.helpers";
import type { ItemType } from "./map.dto";
import { tr } from "zod/v4/locales";

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
        updateBack: () => {},
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
        scope
        state=""
        description="My app is nice."
      >
        <div></div>
      </walker-element>
    `;

    const result = mapper(ctx);

    expect(result).toEqual({
      "my-app": mockItem({
        id: "my-app",
        type: "app",
        scope: true,
        isInActiveScope: true,
        state: "",
        description: "My app is nice.",
        content: false,
        raw: false,
        children: {},
      }),
    });
  });

  it("maps an Walker Item with raw and content", () => {
    document.body.innerHTML = `
      <walker-element
        id="my-app"
        type="app"
        scope
        state=""
        description="My app is nice."
        raw
        content
      >
        <div>Walk the web, walk the Earth!</div>
      </walker-element>
    `;

    const result = mapper(ctx);

    expect(result).toEqual({
      "my-app": mockItem({
        id: "my-app",
        type: "app",
        scope: true,
        isInActiveScope: true,
        description: "My app is nice.",
        state: "",
        raw: true,
        content: true,
        rawValue: "<div>Walk the web, walk the Earth!</div>",
        contentValue: "Walk the web, walk the Earth!",
        children: {},
      }),
    });
  });

  it("maps an Walker Item with nested raw and nested content", () => {
    document.body.innerHTML = `
      <walker-element
        id="my-app"
        type="app"
        scope
        state=""
        description="My app is nice."
        raw
        content
      >
        <div>
          <div>Walker</div>
          <div>Walk the web, walk the Earth!</div>
        </div>
      </walker-element>
    `;

    const result = mapper(ctx);

    expect(result).toEqual({
      "my-app": mockItem({
        id: "my-app",
        type: "app",
        scope: true,
        isInActiveScope: true,
        description: "My app is nice.",
        state: "",
        raw: true,
        content: true,
        rawValue: `<div>
          <div>Walker</div>
          <div>Walk the web, walk the Earth!</div>
        </div>`,
        contentValue: `Walker
          Walk the web, walk the Earth!`,
        children: {},
      }),
    });
  });

  it("maps nested Walker Items", () => {
    document.body.innerHTML = `
      <walker-element
        id="my-app"
        type="app"
        scope
        state=""
        description="My app is nice."
      >
        <walker-element
          id="page-1"
          type="page"
          state=""
          description="My page is nice."
        >
        </walker-element>
      </walker-element>
    `;

    const result = mapper(ctx);

    expect(result).toEqual({
      "my-app": mockItem({
        id: "my-app",
        type: "app",
        scope: true,
        isInActiveScope: true,
        description: "My app is nice.",
        state: "",
        raw: false,
        content: false,
        children: {
          "page-1": mockItem({
            id: "page-1",
            type: "page",
            scope: false,
            isInActiveScope: true,
            description: "My page is nice.",
            state: "",
            raw: false,
            content: false,
            children: {},
          }),
        },
      }),
    });
  });

  it("maps structured Walker Items", () => {
    document.body.innerHTML = `
      <walker-element
        id="my-app"
        type="app"
        state=""
        description="My app is nice."
      >
        <walker-element
          id="page-1"
          type="page"
          scope
          state=""
          description="My page is nice."
        >
          <walker-element
            id="item-1"
            type="item"
            state=""
            description="My item is nice."
          >
          </walker-element>
        </walker-element>
        <walker-element
          id="page-2"
          type="page"
          state=""
          description="My page is nice."
        >
        </walker-element>
      </walker-element>
    `;

    const result = mapper(ctx);

    expect(result).toEqual({
      "my-app": mockItem({
        id: "my-app",
        type: "app",
        scope: false,
        isInActiveScope: false,
        description: "My app is nice.",
        state: "",
        raw: false,
        content: false,
        children: {
          "page-1": mockItem({
            id: "page-1",
            type: "page",
            scope: true,
            isInActiveScope: true,
            description: "My page is nice.",
            state: "",
            raw: false,
            content: false,
            children: {
              "item-1": mockItem({
                id: "item-1",
                type: "item",
                scope: false,
                isInActiveScope: true,
                description: "My item is nice.",
                state: "",
                raw: false,
                content: false,
                children: {},
              }),
            },
          }),
          "page-2": mockItem({
            id: "page-2",
            type: "page",
            scope: false,
            isInActiveScope: false,
            description: "My page is nice.",
            state: "",
            raw: false,
            content: false,
            children: {},
          }),
        },
      }),
    });
  });

  it("should throw an error when there are more than two root Walker App Items", () => {});

  it("should throw an error when there are more than one Walker Item of type 'app'", () => {});

  it("should throw an error when there are duplicate Walker Item ids", () => {});

  it("should throw an error when a Walker Item is missing required attributes", () => {});

  it("should throw an error when a non-leaf Walker Item is enabling the raw attribute", () => {});

  it("should throw an error when a non-leaf Walker Item is enabling the content attribute", () => {});
});
