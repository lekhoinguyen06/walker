import { Page } from "walker-react";
import { SelectDemo } from "../components/SelectDemo";
import SelectDemoRaw from "../components/SelectDemo?raw";
import { CodeContent, CodeDemo, CodeWrapper } from "@/components/CodeBlock";
import { selectActionJSON } from "@/shared/actions/select.action";

export function SelectPage() {
  return (
    <Page
      id="select-page"
      description="The page to demonstrate Walker capability to select items"
    >
      <div className="w-full max-w-2xl flex flex-col gap-24 items-center">
        <CodeWrapper>
          <CodeDemo component={<SelectDemo />} />
          <CodeContent
            raw={{
              lang: "tsx",
              content: SelectDemoRaw,
            }}
          />
          <CodeContent
            raw={{
              lang: "json",
              content: selectActionJSON,
            }}
          />
        </CodeWrapper>
      </div>
    </Page>
  );
}
