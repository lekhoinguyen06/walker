import { persistentJSON } from "@nanostores/persistent";
import type { ActionType } from "walker-shared";

export const $action = persistentJSON<ActionType[]>("walker-action-store", []);
