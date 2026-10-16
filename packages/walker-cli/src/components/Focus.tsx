import type { FocusNode } from "../stores/focus.store";

interface FocusNodeProps extends Omit<FocusNode, "children"> {
  children: React.ReactNode;
}

export function FocusNode({ children, id, onClick }: FocusNodeProps) {
  return <box>{children}</box>;
}
