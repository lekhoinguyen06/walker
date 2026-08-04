import { MobileNav } from "./MobileNav";
import { Button } from "./ui/button";
import ReactLogo from "../assets/react.svg?react";
import VueLogo from "../assets/vuedotjs.svg?react";
import SvelteLogo from "../assets/svelte.svg?react";
import SolidLogo from "../assets/solid.svg?react";
import AngularLogo from "../assets/angular.svg?react";

export default function Header() {
  return (
    <header className="fixed z-50 top-0 right-auto left-auto flex w-full p-3 m-3 max-w-4xl rounded-[12px] justify-between items-center backdrop-blur-sm bg-white/20 dark:bg-black/20">
      <a href="/">
        <img src="/walker.svg" alt="Walker Logo" className="h-6 dark:hidden" />
        <img
          src="/walker-light.svg"
          alt="Walker Logo"
          className="h-6 hidden dark:inline"
        />
      </a>
      <div className="flex items-center">
        <div className="hidden md:flex gap-3">
          <a href="https://react.walker.vstaffs.com">
            <Button variant="ghost" size="lg" className="rounded-none">
              <ReactLogo className="h-6 fill-[#61DAFB]" />
            </Button>
          </a>
          <a href="https://vue.walker.vstaffs.com">
            <Button variant="ghost" size="lg" className="rounded-none">
              <VueLogo className="h-6 fill-[#4FC08D]" />
            </Button>
          </a>
          <a href="https://svelte.walker.vstaffs.com">
            <Button variant="ghost" size="lg" className="rounded-none">
              <SvelteLogo className="h-6 fill-[#FF3E00]" />
            </Button>
          </a>
          <a href="https://solid.walker.vstaffs.com">
            <Button variant="ghost" size="lg" className="rounded-none">
              <SolidLogo className="h-6 fill-[#2C4F7C]" />
            </Button>
          </a>
          <a href="https://angular.walker.vstaffs.com">
            <Button variant="ghost" size="lg" className="rounded-none">
              <AngularLogo className="h-6 fill-[#0F0F11]" />
            </Button>
          </a>
        </div>
        <MobileNav />
      </div>
    </header>
  );
}
