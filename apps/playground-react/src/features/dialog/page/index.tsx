import { Page } from "walker-react";
import { DialogDemo } from "../components/DialogDemo";
import DialogDemoRaw from "../components/DialogDemo?raw";
import { CodeContent, CodeDemo, CodeWrapper } from "@/components/CodeBlock";
import DialogActions from "@/shared/actions/dialog.action.json";

export function DialogPage() {
  return (
    <Page
      id="dialog-page"
      description="The page to demonstrate Walker capability to interact with dialogs"
    >
      <div className="w-full max-w-2xl flex flex-col gap-24 items-center">
        <CodeWrapper>
          <CodeDemo component={<DialogDemo />} />
          <CodeContent
            raw={{
              lang: "tsx",
              content: DialogDemoRaw,
            }}
          />
          <CodeContent
            raw={{
              lang: "json",
              content: JSON.stringify(DialogActions, null, 2),
            }}
          />
        </CodeWrapper>
      </div>
    </Page>
  );
}
