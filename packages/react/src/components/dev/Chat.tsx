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
import { Message, MessageContent } from "../ui/message";
import { Bubble, BubbleContent } from "../ui/bubble";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { highlightMarkdownCode, themeCss } from "@/lib/markdown-highlighter";
import { useConciergeChat } from "./dev.hook";

const streamingExtensions = [streamingMarkdownExtension()];

export function Chat() {
  const { messages, setMessages, sendMessage, status } = useConciergeChat();

  const [input, setInput] = useState("");
  const isBusy = status === "submitted" || status === "streaming";
  return (
    <MessageScrollerProvider>
      <div className="flex h-[60vh] flex-col gap-3">
        <Card className="mx-auto w-full h-[60vh] gap-0">
          <CardHeader className="gap-1 border-b">
            <CardTitle>Chat</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <span className="text-xs">
                Chat and see how the walk suggestion feature works. Walker will
                suggest walks when suitable.
              </span>
            </CardDescription>
            <CardAction>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setInput("");
                  setMessages([]);
                }}
              >
                <RotateCcw />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0">
            {messages.length === 0 ? (
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
                    {messages.map((message) => (
                      <Message
                        align={message.role === "assistant" ? "start" : "end"}
                        key={message.id}
                      >
                        <MessageContent>
                          <Bubble
                            variant={
                              message.role === "assistant" ? "ghost" : "outline"
                            }
                          >
                            <BubbleContent>
                              {message.parts
                                .filter((part) => part.type === "text")
                                .map((part, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className="markdown-renderer typeset first:*:mt-0"
                                    >
                                      <style>{themeCss}</style>
                                      <Markdown
                                        extensions={streamingExtensions}
                                        highlighter={highlightMarkdownCode}
                                      >
                                        {String(part.text)}
                                      </Markdown>
                                    </div>
                                  );
                                })}
                            </BubbleContent>
                          </Bubble>
                        </MessageContent>
                      </Message>
                    ))}
                  </MessageScrollerContent>
                </MessageScrollerViewport>
                <MessageScrollerButton />
              </MessageScroller>
            )}
          </CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (isBusy) {
                return;
              }
              void sendMessage({
                text: input,
              });
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
