import { Page } from "@repo/react";
import { ScrollAreaDemo } from "../components/ScrollAreaDemo";
import ScrollAreaDemoRaw from "../components/ScrollAreaDemo?raw";
import { CodeBlock } from "@/components/CodeBlock";

export function ScrollAreaPage() {
  return (
    <Page
      id="scroll-area-page"
      description="The page to demonstrate Walker behavior to scroll into view before click an item"
    >
      <div className="w-full max-w-2xl flex flex-col gap-24">
        <CodeBlock raw={ScrollAreaDemoRaw} code={<ScrollAreaDemo />} />
      </div>
    </Page>
  );
}
