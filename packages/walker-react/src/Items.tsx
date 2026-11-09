import type { ItemType } from "walker-shared";

export function Item({
  id,
  state,
  children,
}: ItemType & {
  children?: React.ReactNode;
}) {
  return (
    <div id={"walker-" + id} data-state={state}>
      {children}
    </div>
  );
}
