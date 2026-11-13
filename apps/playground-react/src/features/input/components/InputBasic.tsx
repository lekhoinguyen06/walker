import { Input } from "@/components/ui/input";
import { Item } from "walker-react";
import { useState } from "react";
import { ade } from "@/walker/ade";

export function InputBasic() {
  const [input, setInput] = useState("");
  return (
    <Item {...ade.pii()}>
      <Input
        placeholder="Enter text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </Item>
  );
}
