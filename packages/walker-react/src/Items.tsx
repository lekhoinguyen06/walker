import type { Item } from "walker-dom";

export function Item({
  id,
  state,
  children,
}: Item & {
  children?: React.ReactNode;
}) {
  return (
    <div id={"walker-" + id} data-state={state}>
      {children}
    </div>
  );
}
