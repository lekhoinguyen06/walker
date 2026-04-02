import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from '@/components/ui/prompt-input';
import { Button } from '@/components/ui/button';
import { ArrowUp, Code, Globe, MessageCircle, Mic, MoreHorizontal, Plus } from 'lucide-react';
import { useState } from 'react';
import { useChatStore } from '@/store/chat';

export function Input() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addMessage, mode, setMode } = useChatStore();

  const handleSubmit = () => {
    if (!prompt.trim()) return;

    setIsLoading(true);

    // Simulate API call
    console.log('Processing:', prompt);
    addMessage({
      id: Date.now(),
      role: 'user',
      content: prompt,
    });
    setTimeout(() => {
      setPrompt('');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-3 pb-3 md:px-5 md:pb-5">
      <PromptInput
        isLoading={isLoading}
        value={prompt}
        onValueChange={setPrompt}
        onSubmit={handleSubmit}
        className="border-input bg-popover relative z-10 w-full rounded-3xl border p-0 pt-1 shadow-xs"
      >
        <div className="flex flex-col">
          <PromptInputTextarea
            placeholder="Ask anything"
            className="min-h-[44px] pt-3 pl-4 text-base leading-[1.3] sm:text-base md:text-base"
          />

          <PromptInputActions className="mt-5 flex w-full items-center justify-between gap-2 px-3 pb-3">
            <div className="flex items-center gap-2">
              <PromptInputAction tooltip="Add a new action">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9 rounded-full"
                >
                  <Plus size={18} />
                </Button>
              </PromptInputAction>

              <PromptInputAction tooltip="Search">
                <Button variant="outline" className="rounded-full">
                  <Globe size={18} />
                  Search
                </Button>
              </PromptInputAction>

              {mode === 'chat' ? (
                <PromptInputAction tooltip="Devtools">
                  <Button variant="outline" className="size-9 rounded-full" onClick={() => setMode('dev')}>
                    <Code size={18} />
                  </Button>
                </PromptInputAction>
              ) : (
                <PromptInputAction tooltip="Devtools">
                  <Button variant="outline" className="size-9 rounded-full" onClick={() => setMode('chat')}>
                    <MessageCircle size={18} />
                  </Button>
                </PromptInputAction>
              )}


              <PromptInputAction tooltip="More actions">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9 rounded-full"
                >
                  <MoreHorizontal size={18} />
                </Button>
              </PromptInputAction>
            </div>
            <div className="flex items-center gap-2">
              <PromptInputAction tooltip="Voice input">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9 rounded-full"
                >
                  <Mic size={18} />
                </Button>
              </PromptInputAction>

              <Button
                size="icon"
                disabled={!prompt.trim() || isLoading}
                onClick={handleSubmit}
                className="size-9 rounded-full"
              >
                {!isLoading ? (
                  <ArrowUp size={18} />
                ) : (
                  <span className="size-3 rounded-xs bg-white" />
                )}
              </Button>
            </div>
          </PromptInputActions>
        </div>
      </PromptInput>
    </div>
  );
}
