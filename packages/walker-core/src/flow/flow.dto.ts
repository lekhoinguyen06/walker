import type { ActionType } from "../action";
import { type ContextWithHook } from "../context";

export interface FlowType<T = any> {
  command: string;
  description: string;
  route: string;
  schema: any;
  handler: (props: {
    action: ActionType<T>;
    context: ContextWithHook;
  }) => Promise<void>;
}

export interface FlowItemType extends Pick<
  FlowType,
  "command" | "description"
> {}

export type FlowRegistry = Map<string, FlowType>;
