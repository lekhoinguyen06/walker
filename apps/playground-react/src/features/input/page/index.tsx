import { Page } from "@repo/react";
import { InputBasic } from "../components/InputBasic";
import InputBasicRaw from "../components/InputBasic?raw";
import { CodeBlock } from "@/components/CodeBlock";

export function InputPage() {
  return (
    <Page
      id="input-page"
      description="The page to demonstrate Walker behavior to input text"
    >
      <div className="w-full max-w-2xl flex flex-col gap-24 items-center">
        <CodeBlock raw={InputBasicRaw} code={<InputBasic />} />
      </div>
    </Page>
  );
}
