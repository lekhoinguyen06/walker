import { useScreenSize } from '@/hooks/useScreenSize';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { TH1, TLarge } from '@/components/ui/typo';
import { Button } from '@/components/ui/button';
import { RiGithubFill, RiMenu3Line } from '@remixicon/react';
import { Link } from 'react-router';

const MOBILE_NAV_CLASSNAME = 'w-full flex justify-start p-4';

export function Header() {
    const { isSmall } = useScreenSize();
    return (
        <div className="fixed top-0 left-auto right-auto z-50 w-full max-w-300 h-20">
        <div className="flex justify-between items-center bg-white/50 backdrop-blur-lg border-2 border-gray-50 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 h-20">
            <div className="size-10 bg-black"></div>
            <TH1>Walker</TH1>
          </div>
          {isSmall ? (
            <Drawer>
              <DrawerTrigger>
                <Button variant="ghost">
                  <RiMenu3Line className="size-5" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="flex flex-col gap-2 py-5 px-10 items-start">
                  <Button
                    variant="ghost"
                    className={MOBILE_NAV_CLASSNAME}
                  >
                    <TLarge>Docs</TLarge>
                  </Button>
                  <Button
                    variant="ghost"
                    className={MOBILE_NAV_CLASSNAME}
                  >
                    <Link to={'/demo'}>
                      <TLarge>Demo</TLarge>
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className={MOBILE_NAV_CLASSNAME}
                  >
                    <TLarge>Github</TLarge>
                    <RiGithubFill />
                  </Button>
                  <Button
                    variant="ghost"
                    className={MOBILE_NAV_CLASSNAME}
                  >
                    <TLarge>Pricing</TLarge>
                  </Button>
                  <Button
                    variant="ghost"
                    className={MOBILE_NAV_CLASSNAME}
                  >
                    <TLarge>About</TLarge>
                  </Button>
                  <Button className="p-4">
                    <TLarge>Try</TLarge>
                    <TLarge className="text-red-500">Concierge</TLarge>
                  </Button>
                </div>
              </DrawerContent>
            </Drawer>
          ) : (
            <div className="flex gap-2 py-5 px-10">
              <Button variant="ghost">
                <TLarge>Docs</TLarge>
              </Button>
              <Button variant="ghost">
                <Link to={'/demo'}>
                  <TLarge>Demo</TLarge>
                </Link>
              </Button>
              <Button variant="ghost">
                <TLarge>Github</TLarge>
                <RiGithubFill />
              </Button>
              <Button variant="ghost">
                <TLarge>Pricing</TLarge>
              </Button>
              <Button variant="ghost">
                <TLarge>About</TLarge>
              </Button>
              <Button>
                <TLarge>Try</TLarge>
                <TLarge className="text-red-500">Concierge</TLarge>
              </Button>
            </div>
          )}
        </div>
      </div>
    )
}