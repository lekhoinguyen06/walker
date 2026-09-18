import { type ActionType } from "../action";
import { type MapType } from "../map";
import { type FlowItemType, type FlowType } from "../flow";

export interface HistoryType {
  prompt: string;
  flow: FlowItemType;
  action: ActionType;
  map: MapType;
  logs: string[];
}
