import {
  ArrowUpIcon,
  MessageCircleDashedIcon,
  RotateCcw,
  X,
} from "lucide-react";
import { Markdown } from "@tanstack/markdown/react";
import { streamingMarkdownExtension } from "@tanstack/markdown/extensions/streaming";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { Message, MessageContent } from "@/components/ui/message";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { highlightMarkdownCode, themeCss } from "@/lib/markdown-highlighter";
import { useWalkerChat } from "@/walker/hooks/useWalkerChat";
import { usePanelDialog } from "@/walker/hooks";
import { PanelDialog } from "../panel/PanelDialog";

const streamingExtensions = [streamingMarkdownExtension()];

export function ChatDialog() {
  const { closeDialog } = usePanelDialog();
  const { messages, setMessages, sendMessage, status } = useWalkerChat();
  const [input, setInput] = useState("");
  const isBusy = status === "submitted" || status === "streaming";
  return (
    <PanelDialog dialog={"chat"}>
      <div className="size-full p-1.5">
        <div className="flex flex-col w-full h-120 bg-white dark:bg-black rounded-[16px]">
          <div className="relative w-full p-3">
            <div className="font-brand">Chat</div>
            <div className="text-xs">
              Chat and see how the walk suggestion feature works. Walker will
              suggest walks when suitable.
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3"
              onClick={closeDialog}
            >
              <X />
            </Button>
          </div>
          <div className="flex size-full overflow-hidden">
            <div className="flex flex-col size-full p-3 gap-3 overflow-scroll scrollbar-none">
              <MessageScrollerProvider autoScroll>
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
                        {messages.map((message) => {
                          if (message.role === "assistant") {
                            return (
                              <Message align="start" key={message.id}>
                                <MessageContent>
                                  <Bubble variant="ghost">
                                    <BubbleContent>
                                      {message.parts
                                        .filter((part) => part.type === "text")
                                        .map((part, index) => {
                                          return (
                                            <div
                                              key={index}
                                              className="markdown-renderer typeset"
                                            >
                                              <style>{themeCss}</style>
                                              <Markdown
                                                extensions={streamingExtensions}
                                                highlighter={
                                                  highlightMarkdownCode
                                                }
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
                            );
                          } else if (message.role === "user") {
                            return (
                              <Message align="end" key={message.id}>
                                <MessageContent>
                                  <Bubble variant="outline">
                                    <BubbleContent>
                                      {message.parts
                                        .filter((part) => part.type === "text")
                                        .map((part, index) => (
                                          <div key={index}>
                                            {String(part.text)}
                                          </div>
                                        ))}
                                    </BubbleContent>
                                  </Bubble>
                                </MessageContent>
                              </Message>
                            );
                          }
                        })}
                      </MessageScrollerContent>
                    </MessageScrollerViewport>
                    <MessageScrollerButton />
                  </MessageScroller>
                )}
              </MessageScrollerProvider>
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
                <div className="w-full flex items-center gap-1.5">
                  <Button
                    variant="ghost"
                    size="icon-lg"
                    className="rounded-none hover:bg-primary hover:text-white"
                    onClick={() => {
                      setInput("");
                      setMessages([]);
                    }}
                  >
                    <RotateCcw />
                  </Button>
                  <Input
                    placeholder="Type your message..."
                    type="text"
                    className="rounded-full w-full"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon-lg"
                    disabled={isBusy}
                    className="rounded-none hover:bg-primary hover:text-white"
                  >
                    <ArrowUpIcon />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PanelDialog>
  );
}
