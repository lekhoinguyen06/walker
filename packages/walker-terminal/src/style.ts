export function getFoucusStyle({
  focusedId,
  id,
  selected,
}: {
  focusedId: string | null;
  id: string;
  selected?: boolean;
}) {
  return focusedId === id
    ? { backgroundColor: "606060" }
    : { backgroundColor: selected ? "A0A0A0" : undefined };
}
