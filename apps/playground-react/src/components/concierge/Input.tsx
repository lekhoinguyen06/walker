import Editor from "@monaco-editor/react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRuntime } from "@repo/react";

export function Input({ trigger }: { trigger: React.ReactElement }) {
  const runtime = useRuntime();
  const editorRef = useRef<any>(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function showValue() {
    runtime.rawWalk(editorRef.current.getValue());
  }

  return (
    <Popover>
      <PopoverTrigger render={trigger} />
      <PopoverContent className="w-80">
        <div>
          <Editor
            height="40vh"
            width="100%"
            defaultLanguage="json"
            defaultValue="[]"
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
        <Button variant="outline" className="rounded-full" onClick={showValue}>
          Walk
        </Button>
      </PopoverContent>
    </Popover>
  );
}
