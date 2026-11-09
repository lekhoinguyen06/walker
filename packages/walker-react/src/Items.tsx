import type { ItemType } from "walker-shared";

export function Item({
  id,
  description,
  state,
  children,
}: ItemType & {
  children?: React.ReactNode;
}) {
  return (
    <div id={id} data-description={description} data-state={state}>
      {children}
    </div>
  );
}
