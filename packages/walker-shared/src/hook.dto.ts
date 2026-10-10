import { type ActionType } from "./action.dto";
import { type ContextType } from "./context.dto";

export interface HookPropsType {
  action: ActionType;
  context: ContextType;
}

export interface HookFactoryType {
  (props: HookPropsType): Promise<void>;
}

export interface WebHooksType {
  onScroll?: HookFactoryType;
  onMessage?: HookFactoryType;
  onMouse?: HookFactoryType;
}
