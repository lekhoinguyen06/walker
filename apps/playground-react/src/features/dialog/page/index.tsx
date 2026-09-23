import { Page } from "walker-react";
import { DialogDemo } from "../components/DialogDemo";
import DialogDemoRaw from "../components/DialogDemo?raw";
import { CodeContent, CodeDemo, CodeWrapper } from "@/components/CodeBlock";
import { dialogActionJSON } from "@/shared/actions/dialog.action";

export function DialogPage() {
  return (
    <Page
      id="dialog-page"
      description="The page to demonstrate Walker capability to interact with dialogs"
    >
      <div className="w-full max-w-2xl flex flex-col gap-24 py-24 items-center">
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
              content: dialogActionJSON,
            }}
          />
        </CodeWrapper>
      </div>
    </Page>
  );
}
