import { Page } from "@walker/react";
import { ToastDemo } from "../components/ToastDemo";
import ToastDemoRaw from "../components/ToastDemo?raw";
import AppLayout from "../../../AppLayout?raw";
import { CodeBlock, type RawCode } from "@/components/CodeBlock";

const content: RawCode[] = [
  {
    lang: "tsx",
    content: ToastDemoRaw,
  },
  {
    lang: "tsx",
    content: AppLayout,
  },
  {
    lang: "json",
    content: `
[
  {
    "walkId": "uuid",
    "command": "click",
    "target": "toast-trigger",
    "message": "Let's see what we have here..."
  }
]
    `,
  },
];

export function ToastPage() {
  return (
    <Page
      id="toast-page"
      description="The page to demonstrate Walker with toast notifications"
    >
      <div className="w-full max-w-2xl flex flex-col gap-24 items-center">
        <CodeBlock raw={content} code={<ToastDemo />} />
      </div>
    </Page>
  );
}
