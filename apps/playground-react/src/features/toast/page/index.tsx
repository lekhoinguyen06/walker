import { Page } from "walker-react";
import { ToastDemo } from "../components/ToastDemo";
import ToastDemoRaw from "../components/ToastDemo?raw";
import AppLayout from "../../../AppLayout?raw";
import { CodeBlock, type RawCode } from "@/components/CodeBlock";
import ToastActions from "@/shared/actions/toast.action.json";

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
    content: JSON.stringify(ToastActions, null, 2),
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
