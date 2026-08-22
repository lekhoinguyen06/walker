import { Page } from "walker-react";
import { SelectDemo } from "../components/SelectDemo";
import SelectDemoRaw from "../components/SelectDemo?raw";
import { CodeBlock, type RawCode } from "@/components/CodeBlock";
import SelectActions from "@/shared/actions/select.action.json";

const content: RawCode[] = [
  {
    lang: "tsx",
    content: SelectDemoRaw,
  },
  {
    lang: "json",
    content: JSON.stringify(SelectActions, null, 2),
  },
];

export function SelectPage() {
  return (
    <Page
      id="select-page"
      description="The page to demonstrate Walker capability to select items"
    >
      <div className="w-full max-w-2xl flex flex-col gap-24 items-center">
        <CodeBlock raw={content} code={<SelectDemo />} />
      </div>
    </Page>
  );
}
