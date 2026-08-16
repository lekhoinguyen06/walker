import { Page } from "@repo/react";
import { SelectDemo } from "../components/SelectDemo";
import SelectDemoRaw from "../components/SelectDemo?raw";
import { CodeBlock, type RawCode } from "@/components/CodeBlock";

const content: RawCode[] = [
  {
    lang: "tsx",
    content: SelectDemoRaw,
  },
  {
    lang: "json",
    content: `
[
  {
    "command": "select",
    "target": "select-trigger",
    "message": "Let's see what we have!"
  },
  {
    "command": "click",
    "target": "select-item-banana",
    "message": "Banana na na na!"
  }
]
    `,
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
