import Editor from "@monaco-editor/react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRuntime } from "@repo/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { toast } from "../ui/toast";
import { useDarkMode } from "usehooks-ts";

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
  },
  {
    "command": "click",
    "target": "navigation-button-home",
    "message": "Let's go see the next component!"
  },
  {
    "command": "click",
    "target": "button-dialog",
    "message": "Let's go fill in a form!"
  },
  {
    "command": "click",
    "target": "dialog-trigger",
    "message": "Let's see what we have here..."
  },
  {
    "command": "input",
    "target": "name-input",
    "body": "Walker Jr.",
    "message": "Let's type in 'Walker Jr.'"
  },
  {
    "command": "input",
    "target": "username-input",
    "body": "@walker",
    "message": "Let's type in '@walker'"
  },
  {
    "command": "click",
    "target": "dialog-save",
    "message": "Nice! Let's save it!"
  },
  {
    "command": "click",
    "target": "navigation-button-home",
    "message": "Let's go see the next component!"
  },
  {
    "command": "click",
    "target": "button-scroll-area",
    "message": "Let's go scroll something!"
  },
  {
    "command": "click",
    "target": "v1.2.0-beta.1",
    "message": "I am gonna pick the earliest version."
  },
  {
    "command": "click",
    "target": "v1.2.0-beta.50",
    "message": "You know what, I am gonna pick the latest version."
  },
  {
    "command": "click",
    "target": "navigation-button-home",
    "message": "Let's go see the next component!"
  },
  {
    "command": "click",
    "target": "button-toast",
    "message": "I can really see what you see, let's read a toast message!"
  },
  {
    "command": "click",
    "target": "toast-trigger",
    "message": "Let's see what we have here..."
  },
  {
    "command": "click",
    "target": "navigation-button-home",
    "message": "Let's go see the next component!"
  }
]
`;

export function Input() {
  const runtime = useRuntime();
  const editorRef = useRef<any>(null);
  const { isDarkMode } = useDarkMode();

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function showValue() {
    try {
      runtime.rawWalk(editorRef.current.getValue());
      toast.add({
        title: "Success",
        description: "Walk loaded. Press key '0' to start walking.",
        type: "success",
      });
    } catch (error) {
      console.error("Failed to load walk.", error);
      toast.add({
        title: "Error",
        description: "Failed to load walk.",
        type: "error",
      });
    }
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
