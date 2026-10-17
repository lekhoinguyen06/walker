export function getFoucusStyle({
  focusedId,
  id,
  selected,
}: {
  focusedId: string | null;
  id: string;
  selected?: boolean;
}) {
  if (selected) {
    return { backgroundColor: "606060" };
  }
  return focusedId === id ? { backgroundColor: "202020" } : {};
}
