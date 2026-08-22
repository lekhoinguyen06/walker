import { Input } from "@/components/ui/input";
import { Item } from "walker-react";
import { useState } from "react";

export function InputBasic() {
  const [input, setInput] = useState("");
  return (
    <Item
      id="input"
      description="This is example button for the Walker Playground, try click it!"
    >
      <Input
        placeholder="Enter text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </Item>
  );
}
