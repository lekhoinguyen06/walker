import { Page } from "@repo/react";
import { ButtonDefault } from "../components/ButtonDefault";
import ButtonDefaultRaw from "../components/ButtonDefault?raw";
import { CodeBlock, type RawCode } from "@/components/CodeBlock";

const content: RawCode[] = [
  {
    lang: "tsx",
    content: ButtonDefaultRaw,
  },
  {
    lang: "json",
    content: `
[
  {
    "command": "click",
    "target": "button",
    "message": "Clicking..."
  }
]
    `,
  },
];

export function ButtonPage() {
  return (
    <Page
      id="button-page"
      description="The page to demonstrate Walker behavior to click a button"
    >
      <div className="w-full flex flex-col gap-24 items-center">
        <CodeBlock raw={content} code={<ButtonDefault />} />
      </div>
    </Page>
  );
}
