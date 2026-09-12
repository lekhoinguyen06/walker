import { ArrowUpIcon, MessageCircleDashedIcon, RotateCcw } from "lucide-react";
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
import { useState, type Dispatch, type SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { highlightMarkdownCode, themeCss } from "@/lib/markdown-highlighter";
import { useConciergeChat } from "./dev.hook";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const streamingExtensions = [streamingMarkdownExtension()];

export type ChatProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export function ChatPanel({ isOpen, setIsOpen }: ChatProps) {
  const { messages, setMessages, sendMessage, status } = useConciergeChat();

  const [input, setInput] = useState("");
  const isBusy = status === "submitted" || status === "streaming";
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-none sm:max-w-none max-h-none w-[80vw] h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-brand">Chat</DialogTitle>
          <DialogDescription>
            <span className="text-xs">
              Chat and see how the walk suggestion feature works. Walker will
              suggest walks when suitable.
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="w-full h-full overflow-scroll flex flex-col">
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
                                      <div key={index}>{String(part.text)}</div>
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
        </div>
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
              size="icon"
              className="rounded-full hover:bg-primary hover:text-white"
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
              size="icon"
              disabled={isBusy}
              className="rounded-full hover:bg-primary hover:text-white"
            >
              <ArrowUpIcon />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
