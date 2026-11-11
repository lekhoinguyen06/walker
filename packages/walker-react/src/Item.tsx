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
      data-state={JSON.stringify(state)}
      data-flows={JSON.stringify(flows)}
    >
      {children}
    </div>
  );
}
