import { useScreenSize } from '@/hooks/useScreenSize';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { RiGithubFill, RiMenu3Line } from '@remixicon/react';
import { Link } from 'react-router';

const MOBILE_NAV_CLASSNAME = 'w-full flex justify-start p-4';

export function Header() {
  const { isSmall } = useScreenSize();
  return (
    <div className="fixed top-0 left-auto right-auto z-50 w-full max-w-300 h-20">
      <div className="flex justify-between items-center bg-white/50 backdrop-blur-lg border-2 border-gray-50 rounded-2xl shadow-sm">
        <Link to={'/'}>
          <div className="flex items-center gap-2 h-20">
            <div className="size-10 bg-black"></div>
            <span className="text-title-h3">Walker</span>
          </div>
        </Link>
        {isSmall ? (
          <Drawer>
            <DrawerTrigger>
              <Button variant="ghost">
                <RiMenu3Line className="size-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="flex flex-col gap-4 py-5 px-10 items-start">
                <Button variant="ghost" className={MOBILE_NAV_CLASSNAME}>
                  <span className="text-title-h6">Docs</span>
                </Button>
                <Button variant="ghost" className={MOBILE_NAV_CLASSNAME}>
                  <Link to={'/demo'}>
                    <span className="text-title-h6">Demo</span>
                  </Link>
                </Button>
                <Button variant="ghost" className={MOBILE_NAV_CLASSNAME}>
                  <span className="text-title-h6">Github</span>
                  <RiGithubFill />
                </Button>
                <Button variant="ghost" className={MOBILE_NAV_CLASSNAME}>
                  <span className="text-title-h6">Pricing</span>
                </Button>
                <Button variant="ghost" className={MOBILE_NAV_CLASSNAME}>
                  <span className="text-title-h6">About</span>
                </Button>
                <Button className="p-4 hover:bg-red-500">
                  <span className="text-title-h6">Try Concierge</span>
                </Button>
              </div>
            </DrawerContent>
          </Drawer>
        ) : (
          <div className="flex gap-4 py-5 px-10">
            <Button variant="ghost">
              <span className="text-title-h6">Docs</span>
            </Button>
            <Button variant="ghost">
              <Link to={'/demo'}>
                <span className="text-title-h6">Demo</span>
              </Link>
            </Button>
            <Button variant="ghost">
              <span className="text-title-h6">Github</span>
              <RiGithubFill />
            </Button>
            <Button variant="ghost">
              <span className="text-title-h6">Pricing</span>
            </Button>
            <Button variant="ghost">
              <span className="text-title-h6">About</span>
            </Button>
            <Button className="hover:bg-red-500">
              <span className="text-title-h6">Try Concierge</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
