import { Page } from "@walker/react";
import { InputBasic } from "../components/InputBasic";
import InputBasicRaw from "../components/InputBasic?raw";
import { CodeBlock, type RawCode } from "@/components/CodeBlock";

const content: RawCode[] = [
  {
    lang: "tsx",
    content: InputBasicRaw,
  },
  {
    lang: "json",
    content: `
[
  {
    "walkId": "uuid",
    "command": "input",
    "target": "input",
    "body": "Hello World!",
    "message": "Let's type in 'Hello World!'"
  }
]
    `,
  },
];

export function InputPage() {
  return (
    <Page
      id="input-page"
      description="The page to demonstrate Walker behavior to input text"
    >
      <div className="w-full max-w-2xl flex flex-col gap-24 items-center">
        <CodeBlock raw={content} code={<InputBasic />} />
      </div>
    </Page>
  );
}
