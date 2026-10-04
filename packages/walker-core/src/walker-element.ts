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
