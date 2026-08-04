import { Page } from "@repo/react";
import { ButtonDefault } from "../components/ButtonDefault";
import ButtonDefaultRaw from "../components/ButtonDefault?raw";
import { CodeBlock } from "@/components/CodeBlock";

export function ButtonPage() {
  return (
    <Page
      id="button-page"
      description="The page to demonstrate Walker behavior to click a button"
    >
      <div className="w-full max-w-2xl flex flex-col gap-24">
        <CodeBlock raw={ButtonDefaultRaw} code={<ButtonDefault />} />
      </div>
    </Page>
  );
}
