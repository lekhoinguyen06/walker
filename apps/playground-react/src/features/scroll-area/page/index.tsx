import { Page } from "@walker/react";
import { ScrollAreaDemo } from "../components/ScrollAreaDemo";
import ScrollAreaDemoRaw from "../components/ScrollAreaDemo?raw";
import { CodeBlock, type RawCode } from "@/components/CodeBlock";

const content: RawCode[] = [
  {
    lang: "tsx",
    content: ScrollAreaDemoRaw,
  },
  {
    lang: "json",
    content: `
[
  {
    "walkId": "uuid",
    "command": "click",
    "target": "v1.2.0-beta.1",
    "message": "I am gonna pick the earliest version."
  },
  {
    "walkId": "uuid",
    "command": "click",
    "target": "v1.2.0-beta.50",
    "message": "You know what, I am gonna pick the latest version."
  }
]
    `,
  },
];

export function ScrollAreaPage() {
  return (
    <Page
      id="scroll-area-page"
      description="The page to demonstrate Walker behavior to scroll into view before click an item"
    >
      <div className="w-full max-w-2xl flex flex-col gap-24 items-center">
        <CodeBlock raw={content} code={<ScrollAreaDemo />} />
      </div>
    </Page>
  );
}
