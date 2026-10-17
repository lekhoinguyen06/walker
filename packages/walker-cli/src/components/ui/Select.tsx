import { useFocus, useFocusId } from "../../hooks/useFocus";
import { focusTree, getFoucusStyle } from "../App";

type SelectProps = {
  id: string;
  options: { label: string; value: string }[];
  selected: string;
  onSelectChange: (value: string) => void;
  orientation?: "horizontal" | "vertical";
};

export function Select({
  id,
  options,
  selected,
  onSelectChange,
  orientation = "horizontal",
}: SelectProps) {
  const { focusedId } = useFocusId();
  return (
    <box
      focused={focusedId === id}
      style={{
        width: "100%",
        flexDirection: orientation === "horizontal" ? "row" : "column",
        ...getFoucusStyle({ focusedId, id }),
      }}
    >
      {options.map(({ label, value }) => {
        return (
          <box
            focused={focusedId === id + "-" + value + "-select-button"}
            key={value}
            style={{
              minWidth: 10,
              paddingX: 1,
              ...getFoucusStyle({
                focusedId,
                id: id + "-" + value + "-select-button",
                selected: selected === value,
              }),
            }}
          >
            <text>{label}</text>
          </box>
        );
      })}
    </box>
  );
}
