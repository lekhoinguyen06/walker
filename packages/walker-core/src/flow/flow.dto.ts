import type z from "zod";
import type { ActionType } from "../action";
import type { ContextType } from "../context";

export interface FlowType<T = any> {
  command: string;
  description: string;
  route: string;
  schema: any;
  handler: (props: {
    action: ActionType<T>;
    context: ContextType;
  }) => Promise<void>;
}

export interface FlowItemType extends Pick<
  FlowType,
  "command" | "description" | "schema"
> {}

export type FlowRegistry = Map<string, FlowType>;
