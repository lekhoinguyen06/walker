import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Item } from "walker-react";
import { useState } from "react";
import { ade } from "@/walker/ade";

const items = [
  { label: "Select a fruit", value: null },
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
];

export function SelectDemo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Item {...ade.pss()}>
      <Select items={items} value={value} onValueChange={(v) => setValue(v)}>
        <SelectTrigger className="w-full max-w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            {items.map((item) => (
              <Item key={item.value} {...ade.psso(item.value)}>
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
