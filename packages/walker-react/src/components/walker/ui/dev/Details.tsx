import { highlightMarkdownCode, themeCss } from "@/lib/markdown-highlighter";
import { Markdown } from "@tanstack/markdown/react";

type DetailsProps = {
  item: Record<string, any>;
};

export function Details({ item }: DetailsProps) {
  return (
    <>
      <div className="font-brand">Details</div>
      {Object.entries(item).map(([key, value]) => (
        <div key={key}>
          <div className="text-xs font-light">{key}</div>
          <div className="w-full max-h-60 overflow-scroll scrollbar-none">
            <div className="w-fit markdown-renderer">
              <style>{themeCss}</style>
              <Markdown highlighter={highlightMarkdownCode}>
                {"```json\n" + JSON.stringify(value, null, 2) + "\n```"}
              </Markdown>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
