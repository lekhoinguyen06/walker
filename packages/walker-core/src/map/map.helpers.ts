import {
  ItemListSchema,
  LoggerLevel,
  type ContextType,
  type MapItemType,
  type MapType,
} from "walker-shared";
import { getLogger } from "../shared/utils/logger";

export function flattenMap(map: MapType): MapItemType[] {
  const result = Object.values(map).flatMap(({ children, ...item }) => [
    item,
    ...(children ? flattenMap(children) : []),
  ]);

  ItemListSchema.parse(result);

  return result;
}

export function mockItem(props: MapItemType): MapItemType {
  return props;
}

export function mockCtx(): ContextType {
  return {
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
        pushLog: () => {},
      },
      mouseStore: {
        x: 0,
        y: 0,
        setX: () => {},
        setY: () => {},
      },
    },
    hooks: {
      onMouse: async () => {},
      onMessage: async () => {},
      onScroll: async () => {},
    },
    flows: new Map(),
    config: {
      gap: 200,
      isLoading: false,
      verbose: false,
      loop: false,
      url: "",
    },
    logger: getLogger(LoggerLevel.TRACE),
  };
}
