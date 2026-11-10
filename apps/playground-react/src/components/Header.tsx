import { MobileNav } from "./MobileNav";
import { Button } from "./ui/button";
import ReactLogo from "../assets/react.svg?react";
import VueLogo from "../assets/vuedotjs.svg?react";
import SvelteLogo from "../assets/svelte.svg?react";
import { Item } from "walker-react";
import { ade } from "@/walker/ade";

export default function Header() {
  return (
    <Item {...ade.pn()}>
      <header className="fixed z-50 top-0 left-1/2 transform -translate-x-1/2 flex w-full p-3 max-w-4xl rounded-[12px] justify-between items-center">
        <div className=" flex w-full p-3 max-w-4xl rounded-[12px] justify-between items-center backdrop-blur-sm bg-white/20 dark:bg-black/20">
          <Item {...ade.pnh()}>
            <a href="/">
              <img
                src="/walker.svg"
                alt="Walker Logo"
                className="h-6 dark:hidden"
              />
              <img
                src="/walker-light.svg"
                alt="Walker Logo"
                className="h-6 hidden dark:inline"
              />
            </a>
          </Item>
          <div className="flex items-center">
            <div className="invisible md:visible flex gap-3">
              <Item {...ade.pnr()}>
                <a href="https://react.walker.vstaffs.com">
                  <Button variant="ghost" size="lg" className="rounded-none">
                    <ReactLogo className="h-6 fill-[#61DAFB]" />
                  </Button>
                </a>
              </Item>
              <Item {...ade.pnv()}>
                <a href="https://vue.walker.vstaffs.com">
                  <Button variant="ghost" size="lg" className="rounded-none">
                    <VueLogo className="h-6 fill-[#4FC08D]" />
                  </Button>
                </a>
              </Item>
              <Item {...ade.pns()}>
                <a href="https://svelte.walker.vstaffs.com">
                  <Button variant="ghost" size="lg" className="rounded-none">
                    <SvelteLogo className="h-6 fill-[#FF3E00]" />
                  </Button>
                </a>
              </Item>
            </div>
            <MobileNav />
          </div>
        </div>
      </header>
    </Item>
  );
}
