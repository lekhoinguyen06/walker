import { Button } from '@/components/ui/button';
import { RiChatAi3Line } from '@remixicon/react';

type TriggerProps = {
  setOpen: (open: boolean) => void;
};

export default function Trigger({ setOpen }: TriggerProps) {
    
  return (
    <Button
        className="z-50 fixed bottom-0 right-0 mr-8 mb-8 bg-black shadow-sm size-12 ring-2 ring-white aspect-square rounded-none group hover:bg-white hover:ring-black"
        size="icon"
        onClick={() => setOpen(true)}
    >
        <RiChatAi3Line className="text-white group-hover:text-black" />
    </Button>
  );
}