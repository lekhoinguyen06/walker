import { useFocus } from "../../hooks/useFocus";
import type { FocusTree } from "../../stores/focus.store";

type FocusNodeProps = {
  tree: FocusTree;
  children: React.ReactNode;
};

export function FocusProvider({ tree, children }: FocusNodeProps) {
  useFocus(tree);
  return <box>{children}</box>;
}
