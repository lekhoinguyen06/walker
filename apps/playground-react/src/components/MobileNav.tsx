import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PanelRight } from "lucide-react";
import ReactLogo from "../assets/react.svg?react";
import VueLogo from "../assets/vuedotjs.svg?react";
import SvelteLogo from "../assets/svelte.svg?react";
import { Item } from "walker-react";
import { useState } from "react";
import { ade } from "@/walker/ade";

export function MobileNav() {
  const [isOpen, setisOpen] = useState<boolean>(false);
  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        setisOpen(open);
      }}
    >
      <SheetTrigger>
        <Item {...ade.pnmt}>
          <Button
            variant="ghost"
            size="icon-lg"
            className="rounded-none visible md:invisible"
          >
            <PanelRight />
          </Button>
        </Item>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="font-brand text-2xl">Navigation</SheetTitle>
          <SheetDescription>Let's take a walk!</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col">
          <Item {...ade.pnmr}>
            <a href="https://react.walker.vstaffs.com">
              <Button
                variant="ghost"
                size="lg"
                className="rounded-none w-full justify-start gap-3"
              >
                <ReactLogo className="h-6 fill-[#61DAFB]" />
                <span className="text-[#61DAFB] font-semibold">React</span>
              </Button>
            </a>
          </Item>
          <Item {...ade.pnmv}>
            <a href="https://vue.walker.vstaffs.com">
              <Button
                variant="ghost"
                size="lg"
                className="rounded-none w-full justify-start gap-3"
              >
                <VueLogo className="h-6 fill-[#4FC08D]" />
                <span className="text-[#4FC08D] font-semibold">Vue</span>
              </Button>
            </a>
          </Item>
          <Item {...ade.pnms}>
            <a href="https://svelte.walker.vstaffs.com">
              <Button
                variant="ghost"
                size="lg"
                className="rounded-none w-full justify-start gap-3"
              >
                <SvelteLogo className="h-6 fill-[#FF3E00]" />
                <span className="text-[#FF3E00] font-semibold">Svelte</span>
              </Button>
            </a>
          </Item>
        </div>
      </SheetContent>
    </Sheet>
  );
}
