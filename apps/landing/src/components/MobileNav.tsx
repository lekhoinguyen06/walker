import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { PanelRight } from 'lucide-react';

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button
          variant="ghost"
          size="icon-lg"
          className="rounded-none md:hidden"
        >
          <PanelRight />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="font-brand text-2xl">Navigation</SheetTitle>
          <SheetDescription>Let's take a walk!</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col">
          <a href="https://concierge.vstaffs.com">
            <Button
              variant="ghost"
              size="lg"
              className="rounded-none w-full justify-start py-12 hover:bg-red-50"
            >
              Try{' '}
              <img src="/concierge-inline.svg" alt="Concierge Inline Logo" />
            </Button>
          </a>
          <a href="https://walker.vstaffs.com/docs">
            <Button
              variant="ghost"
              size="lg"
              className="rounded-none w-full justify-start py-12"
            >
              Docs
            </Button>
          </a>
          <a href="https://github.com/lekhoinguyen06/walker">
            <Button
              variant="ghost"
              size="lg"
              className="rounded-none w-full justify-start py-12"
            >
              Github
            </Button>
          </a>
          <Button
            variant="ghost"
            size="lg"
            className="rounded-none w-full justify-start py-12"
          >
            Community
          </Button>
        </div>
        <SheetFooter>
          <SheetClose>
            <Button variant="ghost" className="w-full rounded-none py-12">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
