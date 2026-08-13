import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/toast";
import { Item, useRuntime } from "@repo/react";
import { useHotkey } from "@tanstack/react-hotkeys";
import { useRef } from "react";

const items = [
  { label: "Select a fruit", value: null },
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
];

export function SelectDemo() {
  return (
    <Item
      id="select"
      description="This is example select for the Walker Playground."
    >
      <Select items={items}>
        <Item
          id="select-trigger"
          description="This is the select trigger. Click to open the select dropdown."
        >
          <SelectTrigger className="w-full max-w-48">
            <SelectValue />
          </SelectTrigger>
        </Item>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            {items.map((item) => (
              <Item
                id={`select-item-${item.value}`}
                description={`This is a select item. Click to select: ${item.label}.`}
              >
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              </Item>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Item>
  );
}
