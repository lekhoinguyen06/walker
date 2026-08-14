import Editor from "@monaco-editor/react";
import { useRef, type Dispatch, type SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { useRuntime } from "@repo/react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const defaultValue = `
[
  {
    "command": "click",
    "target": "button-input",
    "message": "Let's walk to the Input component!"
  },
  {
    "command": "input",
    "target": "input",
    "body": "Hello World!",
    "message": "Let's type in 'Hello World!'"
  },
  {
    "command": "click",
    "target": "navigation-button-home",
    "message": "Let's go see the next component!"
  },
  {
    "command": "click",
    "target": "button-button",
    "message": "Let's click something!"
  },
  {
    "command": "click",
    "target": "button",
    "message": "Clicking..."
  },
  {
    "command": "click",
    "target": "navigation-button-home",
    "message": "Let's go see the next component!"
  },
  {
    "command": "click",
    "target": "button-select",
    "message": "Let's pick some fruit!"
  },
  {
    "command": "select",
    "target": "select-trigger",
    "message": "Let's see what we have!"
  },
  {
    "command": "click",
    "target": "select-item-banana",
    "message": "Banana na na na!"
  }
]
`;

export function InputModal({
  open,
  setOpen,
  trigger,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  trigger: React.ReactElement;
}) {
  const runtime = useRuntime();
  const editorRef = useRef<any>(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function showValue() {
    setOpen(false);
    runtime.rawWalk(editorRef.current.getValue());
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent className="w-80">
        <div>
          <Editor
            height="40vh"
            width="100%"
            defaultLanguage="json"
            defaultValue={defaultValue}
            onMount={handleEditorDidMount}
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
            variant="outline"
            className="rounded-full"
            onClick={() => editorRef.current.setValue(defaultValue)}
          >
            Clear
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={showValue}
          >
            Walk
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function Input({
  open,
  setOpen,
  trigger,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  trigger: React.ReactElement;
}) {
  const runtime = useRuntime();
  const editorRef = useRef<any>(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function showValue() {
    setOpen(false);
    runtime.rawWalk(editorRef.current.getValue());
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Input</CardTitle>
      </CardHeader>
      <CardContent className="size-full">
        <div>
          <Editor
            height="40vh"
            width="100%"
            defaultLanguage="json"
            defaultValue={defaultValue}
            onMount={handleEditorDidMount}
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
            variant="outline"
            className="rounded-full"
            onClick={() => editorRef.current.setValue(defaultValue)}
          >
            Clear
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={showValue}
          >
            Walk
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
