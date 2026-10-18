import { mask } from "../../utils";

export function InputField({
  focusedId,
  id,
  placeholder,
  title,
  value,
  currentValue,
  onInput,
  onSubmit,
  sensitive = false,
}: {
  focusedId: string | null;
  id: string;
  title: string;
  placeholder: string;
  currentValue?: string;
  value: string;
  onInput: (v: string) => void;
  onSubmit: () => void;
  sensitive?: boolean;
}) {
  return (
    <>
      <text>
        {title}: {sensitive ? mask(currentValue) : currentValue}
      </text>
      <input
        focused={focusedId === id}
        placeholder={placeholder}
        value={value}
        onInput={(v) => onInput(v)}
        style={{
          focusedBackgroundColor: "202020",
        }}
        onSubmit={onSubmit}
      />
    </>
  );
}
