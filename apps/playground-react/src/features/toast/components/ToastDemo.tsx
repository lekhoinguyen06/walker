import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { Item } from "@walker/react";

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
    <Item
      id="toast-trigger"
      description="Click the button below to show a toast notification."
    >
      <Button variant="outline" onClick={showToast}>
        Show Toast
      </Button>
    </Item>
  );
}
