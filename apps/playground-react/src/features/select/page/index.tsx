import { Page } from "@repo/react";
import { SelectDemo } from "../components/SelectDemo";
import SelectDemoRaw from "../components/SelectDemo?raw";
import { CodeBlock } from "@/components/CodeBlock";

export function SelectPage() {
  return (
    <Page
      id="select-page"
      description="The page to demonstrate Walker capability to select items"
    >
      <div className="w-full max-w-2xl flex flex-col gap-24">
        <CodeBlock raw={SelectDemoRaw} code={<SelectDemo />} />
      </div>
    </Page>
  );
}
