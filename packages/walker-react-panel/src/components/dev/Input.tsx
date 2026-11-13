import Editor from "@monaco-editor/react";
import { useRef, type Dispatch, type SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { useDarkMode } from "usehooks-ts";
import { RefreshCcw, X } from "lucide-react";
import { PanelDialog } from "../panel/PanelDialog";
import {
  FAILED_TO_LOAD_ACTION_MSG,
  SUCCESS_LOAD_ACTION_MSG,
} from "../../constants/toast.const";
import { usePanelDialog, usePanelToast } from "@/hooks";
import { useAction } from "walker-react";

const defaultValue = `
[
  {
    "flowCommand": "input",
    "itemId": "walker-playground-react::input::input-field",
    "message": "Let's type in 'Hello World!'",
    "body": {
      "text": "Hello World!"
    }
  }
]
`;

export type InputProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export function InputEditor({ isOpen, setIsOpen }: InputProps) {
  const editorRef = useRef<any>(null);
  const { isDarkMode } = useDarkMode();
  const { pushToast } = usePanelToast();
  const { pushActions } = useAction();

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  }

  function showValue() {
    try {
      pushActions(JSON.parse(editorRef.current.getValue()));
      pushToast({
        type: "success",
        message: SUCCESS_LOAD_ACTION_MSG,
      });
      setIsOpen(false);
    } catch (error) {
      pushToast({
        type: "error",
        message: FAILED_TO_LOAD_ACTION_MSG,
      });
    }
  }

  return (
    <div className="flex flex-col size-full gap-3">
      <div>
        <Editor
          height="240px"
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
    </div>
  );
}

export function InputDialog() {
  const { closeDialog } = usePanelDialog();
  return (
    <PanelDialog dialog={"input"}>
      <div className="size-full">
        <div className="flex flex-col w-full h-120">
          <div className="w-full p-3">
            <div className="font-brand">Input</div>
            <div className="text-xs">
              Input raw Actions to test your application.
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3"
              onClick={closeDialog}
            >
              <X />
            </Button>
          </div>
          <div className="flex size-full overflow-hidden">
            <div className="relative size-full flex flex-col p-3 gap-3 overflow-scroll scrollbar-none">
              <InputEditor isOpen={true} setIsOpen={closeDialog} />
            </div>
          </div>
        </div>
      </div>
    </PanelDialog>
  );
}
