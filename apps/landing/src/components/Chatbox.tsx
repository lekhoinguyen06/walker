import {
  Message,
  MessageAvatar,
  MessageContent,
} from '@/components/ui/message';
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from '@/components/ui/message-scroller';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Bubble, BubbleContent } from './ui/bubble';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const messages: { id: string; role: 'user' | 'assistant'; content: string }[] =
  [
    {
      id: '1',
      role: 'user',
      content: 'Hello, how are you?',
    },
    {
      id: '2',
      role: 'assistant',
      content: "I'm good, thank you! How can I assist you today?",
    },
    {
      id: '3',
      role: 'user',
      content: 'Can you tell me a joke?',
    },
    {
      id: '4',
      role: 'assistant',
      content:
        "Sure! Why don't scientists trust atoms? Because they make up everything!",
    },
  ];

export default function Chatbox() {
  return (
    <Sheet>
      <SheetTrigger className="hover:cursor-pointer">
        <img
          src="/walker-icon.svg"
          className="fixed z-50 bottom-12 right-12 dark:hidden"
        />
        <img
          src="/walker-icon-light.svg"
          className="fixed z-50 bottom-12 right-12 hidden dark:block"
        />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <img src="/concierge-inline.svg" alt="Concierge" />
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 p-3">
          <MessageScrollerProvider autoScroll>
            <MessageScroller>
              <MessageScrollerViewport>
                <MessageScrollerContent>
                  {messages.map((message) => (
                    <MessageScrollerItem
                      key={message.id}
                      messageId={message.id}
                      scrollAnchor={message.role === 'user'}
                    >
                      <Message>
                        <MessageAvatar>
                          <Avatar>
                            <AvatarImage src="/walker-icon.svg" alt="W" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </MessageAvatar>
                        <MessageContent>
                          <Bubble>
                            <BubbleContent>{message.content}</BubbleContent>
                          </Bubble>
                        </MessageContent>
                      </Message>
                    </MessageScrollerItem>
                  ))}
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          </MessageScrollerProvider>
        </div>
      </SheetContent>
    </Sheet>
  );
}
