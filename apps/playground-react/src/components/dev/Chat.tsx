import { useChat } from "@ai-sdk/react";
import { ArrowUpIcon, MessageCircleDashedIcon, RotateCcw } from "lucide-react";
import { DefaultChatTransport } from "ai";
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
import { Message, MessageContent } from "../ui/message";
import { Bubble, BubbleContent } from "../ui/bubble";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { highlightMarkdownCode, themeCss } from "@/lib/markdown-highlighter";

const streamingExtensions = [streamingMarkdownExtension()];

export function Chat() {
  const { messages, sendMessage, status, setMessages } = useChat({
    // messages: initialMessages,
    transport: new DefaultChatTransport({
      api: `${process.env.VITE_CHAT_API_URL}/api/chat`,
      prepareSendMessagesRequest: ({ messages }) => {
        const msgs = messages.map((message) => ({
          role: message.role,
          content: message.parts.map((part) => part.text).join("\n"),
        }));
        return {
          body: {
            messages: msgs,
          },
        };
      },
    }),
  });

  const [input, setInput] = useState("");
  const isBusy = status === "submitted" || status === "streaming";
  return (
    <MessageScrollerProvider>
      <div className="flex h-[60vh] flex-col gap-3">
        <Card className="mx-auto w-full h-[60vh] gap-0">
          <CardHeader className="gap-1 border-b">
            <CardTitle>Chat</CardTitle>
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
