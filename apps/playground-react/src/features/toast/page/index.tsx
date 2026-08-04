import { Page } from "@repo/react";
import { ToastDemo } from "../components/ToastDemo";
import ToastDemoRaw from "../components/ToastDemo?raw";
import AppLayout from "../../../AppLayout?raw";
import { CodeBlock } from "@/components/CodeBlock";

export function ToastPage() {
  return (
    <Page
      id="toast-page"
      description="The page to demonstrate Walker with toast notifications"
    >
      <div className="w-full max-w-2xl flex flex-col gap-24">
        <CodeBlock raw={ToastDemoRaw} code={<ToastDemo />} />
        <CodeBlock raw={AppLayout} />
      </div>
    </Page>
  );
}
