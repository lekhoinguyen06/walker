import { Button } from '@/components/ui/button';
import { RiChatAi3Line } from '@remixicon/react';

type TriggerProps = {
  setOpen: (open: boolean) => void;
};

export default function Trigger({ setOpen }: TriggerProps) {
    
  return (
    <Button
        className="fixed bottom-0 right-0 mr-8 mb-8 bg-white shadow-sm p-4 size-16 aspect-square rounded-full group"
        size="icon"
        onClick={() => setOpen(true)}
    >
        <RiChatAi3Line className="text-black group-hover:text-white" />
    </Button>
  );
}