import { ArrowUpIcon, MessageCircleDashedIcon, RotateCcw } from "lucide-react";
import { Markdown } from "@tanstack/markdown/react";
import { streamingMarkdownExtension } from "@tanstack/markdown/extensions/streaming";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { highlightMarkdownCode, themeCss } from "@/lib/markdown-highlighter";
import { useConciergeWalk } from "./dev.hook";
import { generateWalkPrompt } from "./dev.prompt";

const streamingExtensions = [streamingMarkdownExtension()];

export function Peek() {
  const [input, setInput] = useState("");
  const { runtime, object, submit, isLoading } = useConciergeWalk({
    noWalk: true,
  });
  const isBusy = isLoading;
  const [lastPrompt, setLastPrompt] = useState("");

  return (
    <MessageScrollerProvider>
      <div className="flex flex-col gap-3">
        <Card className="mx-auto w-full gap-0">
          <CardHeader className="gap-1 border-b">
            <CardTitle>Peak</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <span className="text-xs">Peak into each walk's data.</span>
            </CardDescription>
            <CardAction>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setInput("");
                }}
              >
                <RotateCcw />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="w-full h-[50vh] overflow-hidden p-0">
            {!object ? (
              <Empty className="h-full">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <MessageCircleDashedIcon />
                  </EmptyMedia>
                  <EmptyTitle>Morning, Walkers!</EmptyTitle>
                  <EmptyDescription>
                    What are we working on today? Press send to start a new
                    conversation
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <MessageScroller>
                <MessageScrollerViewport>
                  <MessageScrollerContent
                    aria-busy={isBusy}
                    className="p-(--card-spacing)"
                  >
                    <div className="markdown-renderer typeset first:*:mt-0">
                      <style>{themeCss}</style>
                      <Markdown
                        extensions={streamingExtensions}
                        highlighter={highlightMarkdownCode}
                      >
                        {"### Prompt\n\n" +
                          "```json\n" +
                          JSON.stringify(JSON.parse(lastPrompt), null, 2) +
                          "\n```\n\n" +
                          "### Object\n\n" +
                          "```json\n" +
                          JSON.stringify(object, null, 2) +
                          "\n```"}
                      </Markdown>
                    </div>
                  </MessageScrollerContent>
                </MessageScrollerViewport>
                <MessageScrollerButton />
              </MessageScroller>
            )}
          </CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (isBusy || input.trim().length === 0) {
                return;
              }
              const prompt = generateWalkPrompt(runtime, input);
              setLastPrompt(prompt);
              submit(prompt);
              setInput("");
            }}
            className="w-full"
          >
            <InputGroup className="border-none">
              <InputGroupAddon align="block-end">
                <Input
                  id="peek-input"
                  placeholder="Type your message..."
                  type="text"
                  className="border-none text-foreground"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <InputGroupButton
                  type="submit"
                  variant="default"
                  size="icon-sm"
                  disabled={isBusy}
                  className="rounded-none aspect-square"
                >
                  <ArrowUpIcon />
                  <span className="sr-only">Send</span>
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </form>
        </Card>
      </div>
    </MessageScrollerProvider>
  );
}
