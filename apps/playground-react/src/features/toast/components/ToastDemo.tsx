import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { ade } from "@/walker/ade";
import { Item } from "walker-react";

export function ToastDemo() {
  function showToast() {
    const id = toast.add({
      title: "Event created",
      description: "Sunday, December 3 at 9:00 AM",
      actionProps: {
        children: "Undo",
        onClick() {
          toast.close(id);
        },
      },
    });
  }

  return (
    <Item {...ade.ptt()}>
      <Button variant="outline" onClick={showToast}>
        Show Toast
      </Button>
    </Item>
  );
}
