import z from "zod";
import {
  ItemSchema,
  type ItemType,
  type MapItemType,
  type MapType,
} from "./map.dto";

export function flattenMap(map: MapType): ItemType[] {
  const result = Object.values(map).flatMap(({ children, ...item }) => [
    item,
    ...(children ? flattenMap(children) : []),
  ]);

  z.array(ItemSchema).parse(result);

  return result;
}

export function mockItem(props: MapItemType): MapItemType {
  return props;
}
