import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CircleQuestionMark,
  History,
  Map,
  MessageCircle,
  RefreshCcw,
  TextCursor,
} from "lucide-react";

export function PanelMenu() {
  const { openDialog, closeDialog, dialog } = usePanelDialog();
  const { pushToast } = usePanelToast();
  const { runtime } = useRuntime();
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className={cn("rounded-full")}
        onClick={() => {
          runtime.clear();
          pushToast({
            type: "success",
            message: "Cleared walk history.",
            duration: 1,
          });
        }}
      >
        <RefreshCcw />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "rounded-full",
          dialog == "chat" && "bg-accent text-primary",
        )}
        onClick={() => (dialog == "chat" ? closeDialog() : openDialog("chat"))}
      >
        <MessageCircle />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "rounded-full",
          dialog == "map" && "bg-accent text-primary",
        )}
        onClick={() => (dialog == "map" ? closeDialog() : openDialog("map"))}
      >
        <Map />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "rounded-full",
          dialog == "history" && "bg-accent text-primary",
        )}
        onClick={() =>
          dialog == "history" ? closeDialog() : openDialog("history")
        }
      >
        <History />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "rounded-full",
          dialog == "input" && "bg-accent text-primary",
        )}
        onClick={() =>
          dialog == "input" ? closeDialog() : openDialog("input")
        }
      >
        <TextCursor />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "rounded-full",
          dialog == "help" && "bg-accent text-primary",
        )}
        onClick={() => (dialog == "help" ? closeDialog() : openDialog("help"))}
      >
        <CircleQuestionMark />
      </Button>
    </>
  );
}
