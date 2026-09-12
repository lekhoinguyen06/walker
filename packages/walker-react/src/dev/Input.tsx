import Editor from "@monaco-editor/react";
import { useRef, type Dispatch, type SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { useRuntime } from "@/RuntimeProvider";
import { useDarkMode } from "usehooks-ts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RefreshCcw } from "lucide-react";
import { usePanelToast } from "./Panel";

const defaultValue = `
[
  {
    "walkId": "uuid",
    "command": "click",
    "target": "button-input",
    "message": "Let's walk to the Input component!"
  },
  {
    "walkId": "uuid",
    "command": "input",
    "target": "input",
    "body": "Hello World!",
    "message": "Let's type in 'Hello World!'"
  },
  {
    "walkId": "uuid",
    "command": "click",
    "target": "navigation-button-home",
    "message": "Let's go see the next component!"
  },
  {
    "walkId": "uuid",
    "command": "click",
    "target": "button-button",
    "message": "Let's click something!"
  },
  {
    "walkId": "uuid",
    "command": "click",
    "target": "button",
    "message": "Clicking..."
  },
  {
    "walkId": "uuid",
    "command": "click",
    "target": "navigation-button-home",
    "message": "Let's go see the next component!"
  },
  {
    "walkId": "uuid",
    "command": "click",
    "target": "button-select",
    "message": "Let's pick some fruit!"
  },
  {
    "walkId": "uuid",
    "command": "click",
    "target": "select-trigger",
    "message": "Let's see what we have!"
  },
  {
    "walkId": "uuid",
    "command": "click",
    "target": "select-item-banana",
    "message": "Banana na na na!"
  },
  {
    "walkId": "uuid",
    "command": "click",
    "target": "navigation-button-home",
    "message": "Let's go see the next component!"
  },
  {
    "walkId": "uuid",
    "command": "click",
    "target": "button-dialog",
    "message": "Let's go fill in a form!"
  },
  {
    "walkId": "uuid",
    "command": "click",
    "target": "dialog-trigger",
    "message": "Let's see what we have here..."
  },
  {
    "walkId": "uuid",
    "command": "input",
    "target": "name-input",
    "body": "Walker Jr.",
    "message": "Let's type in 'Walker Jr.'"
  },
  {
    "walkId": "uuid",
    "command": "input",
    "target": "username-input",
    "body": "@walker",
    "message": "Let's type in '@walker'"
  },
  {
    "walkId": "uuid",
    "command": "click",
    "target": "dialog-save",
    "message": "Nice! Let's save it!"
  },
  {
    "walkId": "uuid",
    "command": "click",
    "target": "navigation-button-home",
    "message": "Let's go see the next component!"
  },
  {
    "walkId": "uuid",
    "command": "click",
    "target": "button-scroll-area",
    "message": "Let's go scroll something!"
  },
  {
    "walkId": "uuid",
    "command": "click",
    "target": "v1.2.0-beta.1",
    "message": "I am gonna pick the earliest version."
  },
  {
    "walkId": "uuid",
    "command": "click",
    "target": "v1.2.0-beta.50",
    "message": "You know what, I am gonna pick the latest version."
  },
  {
    "walkId": "uuid",
    "command": "click",
    "target": "navigation-button-home",
    "message": "Let's go see the next component!"
  },
  {
    "walkId": "uuid",
    "command": "click",
    "target": "button-toast",
    "message": "I can really see what you see, let's read a toast message!"
  },
  {
    "walkId": "uuid",
    "command": "click",
    "target": "toast-trigger",
    "message": "Let's see what we have here..."
  },
  {
    "walkId": "uuid",
    "command": "click",
    "target": "navigation-button-home",
    "message": "That's it! We are done with the walk. Let's go back home!"
  }
]
`;

export type InputProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export function InputPanel({ isOpen, setIsOpen }: InputProps) {
  const { runtime } = useRuntime();
  const editorRef = useRef<any>(null);
  const { isDarkMode } = useDarkMode();
  const { pushToast } = usePanelToast();

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  }

  function showValue() {
    try {
      runtime.addRawActions(editorRef.current.getValue());
      pushToast({
        type: "success",
        message: "Walk loaded. Press Ctrl + W to start walking.",
      });
      setIsOpen(false);
    } catch (error) {
      pushToast({
        type: "error",
        message: "Something went wrong. Failed to load walk.",
      });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-none sm:max-w-none max-h-none w-[80vw] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-brand">Manual input</DialogTitle>
          <DialogDescription>
            <span className="text-xs">
              Manually input walk actions in JSON format.
            </span>
          </DialogDescription>
        </DialogHeader>
        <div>
          <Editor
            height="60vh"
            width="100%"
            defaultLanguage="json"
            defaultValue={defaultValue}
            onMount={handleEditorDidMount}
            theme={isDarkMode ? "vs-dark" : "light"}
            options={{
              scrollbar: {
                vertical: "hidden",
                horizontal: "hidden",
              },
              lineNumbers: "off",

              // Hide glyph margin (breakpoints, etc.)
              glyphMargin: false,

              // Hide folding controls
              folding: false,

              // Hide the overview ruler (decorations on the right)
              overviewRulerLanes: 0,
              hideCursorInOverviewRuler: true,

              // Hide minimap
              minimap: {
                enabled: false,
              },

              // Optional: remove line highlight
              renderLineHighlight: "none",
            }}
          />
        </div>
        <div className="flex gap-3 justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editorRef.current.setValue(defaultValue)}
            className="rounded-full hover:bg-primary hover:text-white"
          >
            <RefreshCcw />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={showValue}
            className="rounded-full hover:bg-primary hover:text-white"
          >
            <span className="font-brand">W</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
