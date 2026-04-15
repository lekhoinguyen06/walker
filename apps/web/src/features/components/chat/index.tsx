import { RiCloseLine } from '@remixicon/react';
import { Input } from './input';
import { Messages } from './message';
import { Button } from '@/components/ui/button';

type ChatProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function Chat({ open, setOpen }: ChatProps) {
  if (!open) return null;
  return (
    <div className="fixed top-0 right-0 h-full w-full min-w-80 max-w-120 flex flex-col bg-white/50 backdrop-blur-2xl z-50">
      <div className="flex justify-end">
        <Button
          onClick={() => setOpen(false)}
          variant="ghost"
          className="rounded-none size-8 hover:bg-black hover:text-white m-4"
        >
          <RiCloseLine size={24} />
        </Button>
      </div>
      <Messages />
      <Input />
    </div>
  );
}
