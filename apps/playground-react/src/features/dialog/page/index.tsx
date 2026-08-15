import { Page } from "@repo/react";
import { DialogDemo } from "../components/DialogDemo";
import DialogDemoRaw from "../components/DialogDemo?raw";
import { CodeBlock } from "@/components/CodeBlock";

export function DialogPage() {
  return (
    <Page
      id="dialog-page"
      description="The page to demonstrate Walker capability to interact with dialogs"
    >
      <div className="w-full max-w-2xl flex flex-col gap-24 items-center">
        <CodeBlock raw={DialogDemoRaw} code={<DialogDemo />} />
      </div>
    </Page>
  );
}
