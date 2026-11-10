import type { ItemType } from "walker-shared";

export function Item({
  id,
  description,
  state,
  flows,
  children,
}: Omit<ItemType, "flows"> & {
  flows?: readonly string[];
  children?: React.ReactNode;
}) {
  return (
    <div
      id={id}
      data-description={description}
      data-state={state}
      data-flows={flows}
    >
      {children}
    </div>
  );
}
