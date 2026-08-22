import { Page } from "walker-react";
import { ScrollAreaDemo } from "../components/ScrollAreaDemo";
import ScrollAreaDemoRaw from "../components/ScrollAreaDemo?raw";
import { CodeBlock, type RawCode } from "@/components/CodeBlock";
import ScrollAreaActions from "@/shared/actions/scroll-area.action.json";

const content: RawCode[] = [
  {
    lang: "tsx",
    content: ScrollAreaDemoRaw,
  },
  {
    lang: "json",
    content: JSON.stringify(ScrollAreaActions, null, 2),
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
