import { Page } from "@walker/react";
import { DialogDemo } from "../components/DialogDemo";
import DialogDemoRaw from "../components/DialogDemo?raw";
import { CodeBlock, type RawCode } from "@/components/CodeBlock";

const content: RawCode[] = [
  {
    lang: "tsx",
    content: DialogDemoRaw,
  },
  {
    lang: "json",
    content: `
[
  {
    "walkId": "uuid",
    "command": "click",
    "target": "dialog-trigger",
    "message": "Let's see what we have here..."
  },
  {
    "walkId": "uuid",
    "command": "input",
    "target": "name-input",
    "body": "Walker Jr.",
    "message": "Let's type in 'Walker Jr.'"
  },
  {
    "walkId": "uuid",
    "command": "input",
    "target": "username-input",
    "body": "@walker",
    "message": "Let's type in '@walker'"
  },
  {
    "walkId": "uuid",
    "command": "click",
    "target": "dialog-save",
    "message": "Nice! Let's save it!"
  }
]
    `,
  },
];

export function DialogPage() {
  return (
    <Page
      id="dialog-page"
      description="The page to demonstrate Walker capability to interact with dialogs"
    >
      <div className="w-full max-w-2xl flex flex-col gap-24 items-center">
        <CodeBlock raw={content} code={<DialogDemo />} />
      </div>
    </Page>
  );
}
