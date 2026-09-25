import { MobileNav } from "./MobileNav";
import { Button } from "./ui/button";
import ReactLogo from "../assets/react.svg?react";
import VueLogo from "../assets/vuedotjs.svg?react";
import SvelteLogo from "../assets/svelte.svg?react";
import { Link, Page } from "walker-react";

export default function Header() {
  return (
    <Page
      id="navigation"
      description="This is the navigation header for the Walker Playground, you can navigate to different frameworks or go back to the home page."
    >
      <header className="fixed z-50 top-0 left-1/2 transform -translate-x-1/2 flex w-full p-3 max-w-4xl rounded-[12px] justify-between items-center">
        <div className=" flex w-full p-3 max-w-4xl rounded-[12px] justify-between items-center backdrop-blur-sm bg-white/20 dark:bg-black/20">
          <Link
            id="navigation-button-home"
            description="This is the Walker logo, click it to go back to the home page."
          >
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
          </Link>
          <div className="flex items-center">
            <div className="invisible md:visible flex gap-3">
              <Link
                id="navigation-button-react"
                description="This is the React logo, click it to go to the Walker Playground for React."
              >
                <a href="https://react.walker.vstaffs.com">
                  <Button variant="ghost" size="lg" className="rounded-none">
                    <ReactLogo className="h-6 fill-[#61DAFB]" />
                  </Button>
                </a>
              </Link>
              <Link
                id="navigation-button-vue"
                description="This is the Vue logo, click it to go to the Walker Playground for Vue."
              >
                <a href="https://vue.walker.vstaffs.com">
                  <Button variant="ghost" size="lg" className="rounded-none">
                    <VueLogo className="h-6 fill-[#4FC08D]" />
                  </Button>
                </a>
              </Link>
              <Link
                id="navigation-button-svelte"
                description="This is the Svelte logo, click it to go to the Walker Playground for Svelte."
              >
                <a href="https://svelte.walker.vstaffs.com">
                  <Button variant="ghost" size="lg" className="rounded-none">
                    <SvelteLogo className="h-6 fill-[#FF3E00]" />
                  </Button>
                </a>
              </Link>
            </div>
            <MobileNav />
          </div>
        </div>
      </header>
    </Page>
  );
}
