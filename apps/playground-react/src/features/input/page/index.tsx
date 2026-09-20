import { Page } from "walker-react";
import { InputBasic } from "../components/InputBasic";
import InputBasicRaw from "../components/InputBasic?raw";
import { CodeContent, CodeDemo, CodeWrapper } from "@/components/CodeBlock";
import InputActions from "@/shared/actions/input.action.json";

export function InputPage() {
  return (
    <Page
      id="input-page"
      description="The page to demonstrate Walker behavior to input text"
    >
      <div className="w-full max-w-2xl flex flex-col gap-24 items-center">
        <CodeWrapper>
          <CodeDemo component={<InputBasic />} />
          <CodeContent
            raw={{
              lang: "tsx",
              content: InputBasicRaw,
            }}
          />
          <CodeContent
            raw={{
              lang: "json",
              content: JSON.stringify(InputActions, null, 2),
            }}
          />
        </CodeWrapper>
      </div>
    </Page>
  );
}
