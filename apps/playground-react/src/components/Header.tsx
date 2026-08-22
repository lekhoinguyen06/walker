import { MobileNav } from "./MobileNav";
import { Button } from "./ui/button";
import ReactLogo from "../assets/react.svg?react";
import VueLogo from "../assets/vuedotjs.svg?react";
import SvelteLogo from "../assets/svelte.svg?react";
import SolidLogo from "../assets/solid.svg?react";
import AngularLogo from "../assets/angular.svg?react";
import { Item, Page } from "walker-react";

export default function Header() {
  return (
    <Page
      id="navigation"
      description="This is the navigation header for the Walker Playground, you can navigate to different frameworks or go back to the home page."
    >
      <header className="fixed z-50 top-0 left-1/2 transform -translate-x-1/2 flex w-full p-3 m-3 max-w-4xl rounded-[12px] justify-between items-center backdrop-blur-sm bg-white/20 dark:bg-black/20">
        <Item
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
        </Item>
        <div className="flex items-center">
          <div className="hidden md:flex gap-3">
            <Item
              id="navigation-button-react"
              description="This is the React logo, click it to go to the Walker Playground for React."
            >
              <a href="https://react.walker.vstaffs.com">
                <Button variant="ghost" size="lg" className="rounded-none">
                  <ReactLogo className="h-6 fill-[#61DAFB]" />
                </Button>
              </a>
            </Item>
            <Item
              id="navigation-button-vue"
              description="This is the Vue logo, click it to go to the Walker Playground for Vue."
            >
              <a href="https://vue.walker.vstaffs.com">
                <Button variant="ghost" size="lg" className="rounded-none">
                  <VueLogo className="h-6 fill-[#4FC08D]" />
                </Button>
              </a>
            </Item>
            <Item
              id="navigation-button-svelte"
              description="This is the Svelte logo, click it to go to the Walker Playground for Svelte."
            >
              <a href="https://svelte.walker.vstaffs.com">
                <Button variant="ghost" size="lg" className="rounded-none">
                  <SvelteLogo className="h-6 fill-[#FF3E00]" />
                </Button>
              </a>
            </Item>
            <Item
              id="navigation-button-solid"
              description="This is the Solid logo, click it to go to the Walker Playground for Solid."
            >
              <a href="https://solid.walker.vstaffs.com">
                <Button variant="ghost" size="lg" className="rounded-none">
                  <SolidLogo className="h-6 fill-[#2C4F7C]" />
                </Button>
              </a>
            </Item>
            <Item
              id="navigation-button-angular"
              description="This is the Angular logo, click it to go to the Walker Playground for Angular."
            >
              <a href="https://angular.walker.vstaffs.com">
                <Button variant="ghost" size="lg" className="rounded-none">
                  <AngularLogo className="h-6 fill-foreground" />
                </Button>
              </a>
            </Item>
          </div>
          <MobileNav />
        </div>
      </header>
    </Page>
  );
}
