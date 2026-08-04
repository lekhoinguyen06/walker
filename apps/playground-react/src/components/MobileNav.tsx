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
import SolidLogo from "../assets/solid.svg?react";
import AngularLogo from "../assets/angular.svg?react";

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
          <a href="https://solid.walker.vstaffs.com">
            <Button
              variant="ghost"
              size="lg"
              className="rounded-none w-full justify-start gap-3"
            >
              <SolidLogo className="h-6 fill-[#2C4F7C]" />
              <span className="text-[#2C4F7C] font-semibold">Solid</span>
            </Button>
          </a>
          <a href="https://angular.walker.vstaffs.com">
            <Button
              variant="ghost"
              size="lg"
              className="rounded-none w-full justify-start gap-3"
            >
              <AngularLogo className="h-6 fill-foreground" />
              <span className="text-foreground font-semibold">Angular</span>
            </Button>
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
