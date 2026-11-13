import { Item } from "walker-react";
import { InputBasic } from "../components/InputBasic";
import InputBasicRaw from "../components/InputBasic?raw";
import { CodeContent, CodeDemo, CodeWrapper } from "@/components/CodeBlock";
import { inputActionJSON } from "@/shared/actions/input.action";
import { ade } from "@/walker/ade";

export function InputPage() {
  return (
    <Item {...ade.pi()}>
      <div className="w-full max-w-2xl flex flex-col gap-24 py-24 items-center">
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
              content: inputActionJSON,
            }}
          />
        </CodeWrapper>
      </div>
    </Item>
  );
}
