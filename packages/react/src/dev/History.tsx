import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { highlightMarkdownCode, themeCss } from "@/lib/markdown-highlighter";
import { useRuntime } from "@/RuntimeProvider";
import { Markdown } from "@tanstack/markdown/react";

export function History() {
  const { runtime } = useRuntime();
  return (
    <Card>
      <CardHeader>
        <CardTitle>History</CardTitle>
        <CardDescription>
          <span className="text-xs">View your walk history</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[50vh] overflow-scroll">
          <div className="markdown-renderer typeset first:*:mt-0">
            <style>{themeCss}</style>
            <Markdown highlighter={highlightMarkdownCode}>
              {"```json\n" +
                JSON.stringify(runtime.listHistory(), null, 2) +
                "\n```"}
            </Markdown>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
