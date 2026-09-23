import { Page } from "walker-react";
import { ToastDemo } from "../components/ToastDemo";
import ToastDemoRaw from "../components/ToastDemo?raw";
import AppLayout from "../../../AppLayout?raw";
import { CodeContent, CodeDemo, CodeWrapper } from "@/components/CodeBlock";
import { toastActionJSON } from "@/shared/actions/toast.action";

export function ToastPage() {
  return (
    <Page
      id="toast-page"
      description="The page to demonstrate Walker with toast notifications"
    >
      <div className="w-full max-w-2xl flex flex-col gap-24 items-center">
        <CodeWrapper>
          <CodeDemo component={<ToastDemo />} />
          <CodeContent
            raw={{
              lang: "tsx",
              content: ToastDemoRaw,
            }}
          />
          <CodeContent
            raw={{
              lang: "tsx",
              content: AppLayout,
            }}
          />
          <CodeContent
            raw={{
              lang: "json",
              content: toastActionJSON,
            }}
          />
        </CodeWrapper>
      </div>
    </Page>
  );
}
