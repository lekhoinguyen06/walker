import { type ActionType } from "../action";
import { type ContextType } from "../context";

export interface HookPropsType {
  action: ActionType;
  context: ContextType;
}

export interface HookFactoryType {
  (props: HookPropsType): Promise<void>;
}
