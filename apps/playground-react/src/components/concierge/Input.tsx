import Editor from "@monaco-editor/react";
import { useRef, type Dispatch, type SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { useRuntime } from "@repo/react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

const defaultValue = `
[
  {
    "command": "click",
    "target": "",
    "message": ""
  }
]
`;

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
