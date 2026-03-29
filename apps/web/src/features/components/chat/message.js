import { ChatContainerContent, ChatContainerRoot, } from '@/components/ui/chat-container';
import { Message, MessageAvatar, MessageContent, } from '@/components/ui/message';
import { cn } from '@/lib/utils';
import { useChatStore } from '@/store/chat';
import { useEffect } from 'react';
import { messages as mock } from './mock';
export function Messages() {
    var _a = useChatStore(), messages = _a.messages, setMessages = _a.setMessages;
    useEffect(function () {
        if (messages.length === 0) {
            setMessages(mock);
        }
    }, [setMessages]);
    return (<ChatContainerRoot>
      <ChatContainerContent className="space-y-12 px-1 py-12 md:px-4">
        {messages.map(function (message) {
            var isAssistant = message.role === 'assistant';
            return (<Message key={message.id} className={cn('mx-auto flex w-full max-w-3xl flex-col gap-2 px-0 md:px-6', isAssistant ? 'items-start' : 'items-end')}>
              <div className={cn('flex w-full items-end gap-3', isAssistant ? 'flex-row' : 'flex-row-reverse')}>
                {isAssistant ? (<MessageAvatar className="mb-0.5 h-6 w-6" src="https://prompt-kit.com/logo.png" alt={"Avatar of the assistant"}/>) : (<MessageAvatar className="h-6 w-6" src="https://github.com/ibelick.png" alt={"Avatar of the user"}/>)}
                {isAssistant ? (<MessageContent className="prose text-primary w-full max-w-[85%] flex-1 overflow-x-auto rounded-lg bg-transparent p-0 py-0 sm:max-w-[75%]" markdown>
                    {message.content}
                  </MessageContent>) : (<MessageContent className="bg-secondary text-primary max-w-[85%] sm:max-w-[75%]">
                    {message.content}
                  </MessageContent>)}
              </div>
            </Message>);
        })}
        <div className="w-full h-20"></div>
      </ChatContainerContent>
    </ChatContainerRoot>);
}
