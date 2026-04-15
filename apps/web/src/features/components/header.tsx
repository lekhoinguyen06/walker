import { useScreenSize } from '@/hooks/useScreenSize';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { RiMenu3Line } from '@remixicon/react';
import { Link } from 'react-router';
import { BaseItem } from '@repo/react';

const MOBILE_NAV_CLASSNAME = 'w-full flex justify-start p-4';

export function Header() {
  const { isSmall } = useScreenSize();
  return (
    <div className="fixed top-0 left-auto right-auto z-50 w-full max-w-300 h-20">
      <BaseItem itemKey='navigation-header'>
      <div className="flex justify-between items-center bg-white/50 backdrop-blur-lg border-2 border-gray-50 rounded-2xl shadow-sm">
        <BaseItem itemKey='link-to-home-page'>
        <Link to={'/'}>
          <div className="flex items-center gap-2 h-20">
            <div className="size-10 bg-black"></div>
            <span className="text-title-h3">Walker</span>
          </div>
        </Link>
        </BaseItem>
        {isSmall ? (
          <Drawer>
            <DrawerTrigger>
              <Button variant="ghost" className='size-10 hover:bg-white rounded-none hover:ring-2 hover:ring-black'>
                <RiMenu3Line className="size-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="flex flex-col gap-4 py-5 px-10 items-start">
                <BaseItem itemKey='link-to-document-page'>
                  <Link to={'https://vstaffs.mintlify.app/'}>
                    <Button variant="ghost" className={MOBILE_NAV_CLASSNAME}>
                      <span className="text-title-h6">Docs</span>
                    </Button>
                  </Link>
                </BaseItem>
                <BaseItem itemKey='link-to-demo-page'>
                  <Link to={'/demo'}>
                    <Button variant="ghost" className={MOBILE_NAV_CLASSNAME}>
                      <span className="text-title-h6">Demo</span>
                    </Button>
                  </Link>
                </BaseItem>
                <BaseItem itemKey='link-to-github-page'>
                  <Link to={'https://github.com/lekhoinguyen06/walker'}>
                    <Button variant="ghost" className={MOBILE_NAV_CLASSNAME}>
                      <span className="text-title-h6">Github</span>
                    </Button>
                  </Link>
                </BaseItem>
                <BaseItem itemKey='link-to-pricing-page'>
                  <Link to={'/pricing'}>
                    <Button variant="ghost" className={MOBILE_NAV_CLASSNAME}>
                      <span className="text-title-h6">Pricing</span>
                    </Button>
                  </Link>
                </BaseItem>
                <BaseItem itemKey='link-to-about-page'>
                  <Link to={'/about'}>
                    <Button variant="ghost" className={MOBILE_NAV_CLASSNAME}>
                      <span className="text-title-h6">About</span>
                    </Button>
                  </Link>
                </BaseItem>
                <BaseItem itemKey='link-to-try-concierge'>
                  <Button variant="ghost" className={MOBILE_NAV_CLASSNAME}>
                      <span className="text-title-h6">Concierge</span>
                    </Button>
                </BaseItem>
              </div>
            </DrawerContent>
          </Drawer>
        ) : (
          <div className="flex gap-4 py-5 px-10">
            <BaseItem itemKey='link-to-docs-page'>
              <Link to={'https://vstaffs.mintlify.app/'}>
                <Button variant="ghost" className='hover:bg-white rounded-none hover:ring-2 hover:ring-black'>
                  <span className="text-title-h6">Docs</span>
                </Button>
              </Link>
            </BaseItem>
            <BaseItem itemKey='link-to-demo-page'>
              <Link to={'/demo'}>
                <Button variant="ghost" className='hover:bg-white rounded-none hover:ring-2 hover:ring-black'>
                  <span className="text-title-h6">Demo</span>
                </Button>
              </Link>
            </BaseItem>
            <BaseItem itemKey='link-to-github-page'>
              <Link to={'https://github.com/lekhoinguyen06/walker'}>
                <Button variant="ghost" className='hover:bg-white rounded-none hover:ring-2 hover:ring-black'>
                  <span className="text-title-h6">Github</span>
                </Button>
              </Link>
            </BaseItem>
            <BaseItem itemKey='link-to-pricing-page'>
              <Link to={'/pricing'}>
                <Button variant="ghost" className='hover:bg-white rounded-none hover:ring-2 hover:ring-black'>
                  <span className="text-title-h6">Pricing</span>
                </Button>
              </Link>
            </BaseItem>
            <BaseItem itemKey='link-to-about-page'>
              <Link to={'/about'}>
                <Button variant="ghost" className='hover:bg-white rounded-none hover:ring-2 hover:ring-black'>
                  <span className="text-title-h6">About</span>
                </Button>
              </Link>
            </BaseItem>
            <BaseItem itemKey='link-to-try-concierge'>
              <Button className="hover:bg-red-500 rounded-none hover:ring-2 hover:ring-black">
                <span className="text-title-h6">Try Concierge</span>
              </Button>
            </BaseItem>
          </div>
        )}
      </div>
    </BaseItem> 
    </div>
  );
}
