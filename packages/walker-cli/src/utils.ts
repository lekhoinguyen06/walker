export function mask(value?: string | null, visible: number = 3): string {
  if (!value) return "";
  return (
    value.slice(0, visible) + "*".repeat(Math.max(0, value.length - visible))
  );
}
