import { useObject } from "@ai-sdk/react";
import { ArrowUpIcon, MessageCircleDashedIcon, RotateCcw } from "lucide-react";
import { Markdown } from "@tanstack/markdown/react";
import { streamingMarkdownExtension } from "@tanstack/markdown/extensions/streaming";
import {
  Card,
  CardAction,
  CardContent,
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
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { highlightMarkdownCode, themeCss } from "@/lib/markdown-highlighter";
import { ActionSchema, useRuntime } from "@walker/react";

const streamingExtensions = [streamingMarkdownExtension()];

export function Walk() {
  const [input, setInput] = useState("");
  const { runtime } = useRuntime();
  const { object, submit, isLoading } = useObject({
    api: `${process.env.VITE_WALK_API_URL}/api/walk`,
    schema: ActionSchema,
    onFinish: (result) => {
      runtime.manualWalk([result.object]);
    },
  });
  const isBusy = isLoading;

  console.log("flows", runtime.listFlows());

  const context = {
    guide: `
      You are a Walker agent. Your task is to assist the user navigate the web.
      Your are provided flows, which are the actions you are allowed to perform.
      You are provided map, which consist of objects of Items.
      An action object is what you need to return, an example is: {
        walkId: "123", // Just return "123" for now, we are still building the framework
        command: "click", // You can also choose other commands provided by the flows.
        target: "input-button", // You have to choose a target that exist in the map. Items in the map contains ids, you have to pick one.
        message: "Let's go to the input page!"
      }
      Try to keep output and thinking as concise as possible to quickly return result.
    `,
    flows: runtime?.listFlows(),
    map: runtime?.map(),
    prompt: input.trim(),
  };

  return (
    <MessageScrollerProvider>
      <div className="flex h-[60vh] flex-col gap-3">
        <Card className="mx-auto w-full h-[60vh] gap-0">
          <CardHeader className="gap-1 border-b">
            <CardTitle>Walk inspection</CardTitle>
            {/*<CardDescription className="flex items-center gap-1">
              <CircleAlert size={12} className="text-destructive" />
              <span className="text-xs font-semibold text-destructive">
                Please do not enter sensitive data. Our AI provider may use
                prompts for training and may retain prompt data.
              </span>
            </CardDescription>*/}
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
          <CardContent className="flex-1 overflow-hidden p-0">
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
                        {"```json \n" + JSON.stringify(object) + "\n```"}
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
              submit(context);
              setInput("");
            }}
            className="w-full"
          >
            <InputGroup className="border-none">
              <InputGroupAddon align="block-end">
                <Input
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
