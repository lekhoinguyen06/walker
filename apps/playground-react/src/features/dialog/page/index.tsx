import { Page } from "walker-react";
import { DialogDemo } from "../components/DialogDemo";
import DialogDemoRaw from "../components/DialogDemo?raw";
import { CodeBlock, type RawCode } from "@/components/CodeBlock";
import DialogActions from "@/shared/actions/dialog.action.json";

const content: RawCode[] = [
  {
    lang: "tsx",
    content: DialogDemoRaw,
  },
  {
    lang: "json",
    content: JSON.stringify(DialogActions, null, 2),
  },
];

export function DialogPage() {
  return (
    <Page
      id="dialog-page"
      description="The page to demonstrate Walker capability to interact with dialogs"
    >
      <div className="w-full max-w-2xl flex flex-col gap-24 items-center">
        <CodeBlock raw={content} code={<DialogDemo />} />
      </div>
    </Page>
  );
}
