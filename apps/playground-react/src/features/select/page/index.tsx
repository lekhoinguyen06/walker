import { Page } from "walker-react";
import { SelectDemo } from "../components/SelectDemo";
import SelectDemoRaw from "../components/SelectDemo?raw";
import {
  CodeContent,
  CodeDemo,
  CodeWrapper,
  type RawCode,
} from "@/components/CodeBlock";
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
              content: JSON.stringify(SelectActions, null, 2),
            }}
          />
        </CodeWrapper>
      </div>
    </Page>
  );
}
