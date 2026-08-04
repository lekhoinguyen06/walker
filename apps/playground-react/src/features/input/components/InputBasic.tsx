import { Input } from "@/components/ui/input";
import { Item } from "@repo/react";

export function InputBasic() {
  return (
    <Item
      id="input-button"
      description="This is example button for the Walker Playground, try click it!"
    >
      <Input placeholder="Enter text" />
    </Item>
  );
}
