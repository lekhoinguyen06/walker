import { Input } from "@/components/ui/input";
import { Item } from "walker-react";
import { useState } from "react";

export function InputBasic() {
  const [input, setInput] = useState("");
  return (
    <Item
      id="walker-input-field"
      description="This is example input for the Walker Playground, try the input flow!"
    >
      <Input
        placeholder="Enter text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </Item>
  );
}
