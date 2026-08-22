import { Page } from "walker-react";
import { ButtonDefault } from "../components/ButtonDefault";
import ButtonDefaultRaw from "../components/ButtonDefault?raw";
import { CodeBlock, type RawCode } from "@/components/CodeBlock";
import ButtonActions from "@/shared/actions/button.action.json";

const content: RawCode[] = [
  {
    lang: "tsx",
    content: ButtonDefaultRaw,
  },
  {
    lang: "json",
    content: JSON.stringify(ButtonActions, null, 2),
  },
];

export function ButtonPage() {
  return (
    <Page
      id="button-page"
      description="The page to demonstrate Walker behavior to click a button"
    >
      <div className="w-full flex flex-col gap-24 items-center">
        <CodeBlock raw={content} code={<ButtonDefault />} />
      </div>
    </Page>
  );
}
