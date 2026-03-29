import { RiCloseLine } from '@remixicon/react';
import { Input } from './input';
import { Messages } from './message';
import { Button } from '@/components/ui/button';
export function Chat(_a) {
    var open = _a.open, setOpen = _a.setOpen;
    if (!open)
        return null;
    return (<div className="fixed top-0 right-0 h-full w-full min-w-80 max-w-120 flex flex-col bg-white/50 backdrop-blur-2xl z-50">
      <div className="flex justify-end">
        <Button onClick={function () { return setOpen(false); }} variant="ghost" className="rounded-full m-4">
          <RiCloseLine size={24}/>
        </Button>
      </div>
      <Messages />
      <Input />
    </div>);
}
