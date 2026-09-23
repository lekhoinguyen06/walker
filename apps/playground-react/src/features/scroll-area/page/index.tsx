import { Page } from "walker-react";
import { ScrollAreaDemo } from "../components/ScrollAreaDemo";
import ScrollAreaDemoRaw from "../components/ScrollAreaDemo?raw";
import { CodeContent, CodeDemo, CodeWrapper } from "@/components/CodeBlock";
import { scrollAreaActionJSON } from "@/shared/actions/scroll-area.action";

export function ScrollAreaPage() {
  return (
    <Page
      id="scroll-area-page"
      description="The page to demonstrate Walker behavior to scroll into view before click an item"
    >
      <div className="w-full max-w-2xl flex flex-col gap-24 py-24 items-center">
        <CodeWrapper>
          <CodeDemo component={<ScrollAreaDemo />} />
          <CodeContent
            raw={{
              lang: "tsx",
              content: ScrollAreaDemoRaw,
            }}
          />
          <CodeContent
            raw={{
              lang: "json",
              content: scrollAreaActionJSON,
            }}
          />
        </CodeWrapper>
      </div>
    </Page>
  );
}
