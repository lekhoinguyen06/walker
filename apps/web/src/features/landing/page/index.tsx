import {
  TH1,
  TH4,
  TLarge,
  TList,
  TMuted,
  TPara,
  TSmall,
} from '@/components/ui/typo';
import { Button } from '@/components/ui/button';
import {
  RiAlibabaCloudFill,
  RiAlipayFill,
  RiGithubFill,
  RiGitlabFill,
  RiLinkedinBoxFill,
  RiMenu3Line,
  RiMetaFill,
  RiNetflixFill,
  RiNodejsFill,
  RiNotionFill,
  RiOpenaiFill,
  RiVercelFill,
} from '@remixicon/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useScreenSize } from '@/hooks/useScreenSize';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

export function LandingPage() {
  const { isSmall } = useScreenSize();
  return (
    <div className="w-screen h-screen p-0 m-0 flex flex-col items-center overflow-x-hidden">
      {/* Header */}
      <div className="fixed top-0 left-auto right-auto z-50 w-full max-w-300 h-20">
        <div className="flex justify-between items-center bg-white/50 backdrop-blur-lg border-2 border-gray-50 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 h-20">
            <div className="size-10 bg-black"></div>
            <TH1>Walker</TH1>
          </div>
          {isSmall ? (
            <Drawer>
              <DrawerTrigger>
                <Button variant='ghost'><RiMenu3Line className="size-5" /></Button>
              </DrawerTrigger>
              <DrawerContent>
                 <div className="flex flex-col gap-2 py-5 px-10 items-start">
                  <Button variant="ghost" className='w-full flex justify-start p-4'>
                    <TLarge>Docs</TLarge>
                  </Button>
                  <Button variant="ghost" className='w-full flex justify-start p-4'>
                    <TLarge>Demo</TLarge>
                  </Button>
                  <Button variant="ghost" className='w-full flex justify-start p-4'>
                    <TLarge>Github</TLarge>
                    <RiGithubFill />
                  </Button>
                  <Button variant="ghost" className='w-full flex justify-start p-4'>
                    <TLarge>Pricing</TLarge>
                  </Button>
                  <Button variant="ghost" className='w-full flex justify-start p-4'>
                    <TLarge>About</TLarge>
                  </Button>
                  <Button className='p-4'>
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
                <TLarge>Demo</TLarge>
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
      {/* Body */}
      <div className="w-full max-w-300 flex flex-col gap-20">
        <div className="relative w-full h-110 bg-amber-200 mt-10">
          <div className="absolute bottom-0 right-0 flex flex-col items-end">
            <TH4 className="text-white mr-10 mb-2">
              An open-source front-end library to propel an AI-human driven
              UI/UX future.
            </TH4>
            <TH1 className="text-white">Walk the earth...</TH1>
          </div>
        </div>
        <div className="w-full h-200 p-10 flex flex-col gap-20">
          <TH4>Trusted by top teams</TH4>
          <div className="w-full flex justify-evenly overflow-x-scroll">
            <div className="p-5">
              <RiNotionFill size={60} />
            </div>
            <div className="p-5">
              <RiMetaFill size={60} className="text-blue-400" />
            </div>
            <div className="p-5">
              <RiAlipayFill size={60} className="text-blue-400" />
            </div>
            <div className="p-5">
              <RiOpenaiFill size={60} />
            </div>
            <div className="p-5">
              <RiNetflixFill size={60} className="text-red-500" />
            </div>
            <div className="p-5">
              <RiGitlabFill size={60} className="text-orange-400" />
            </div>
            <div className="p-5">
              <RiLinkedinBoxFill size={60} className="text-blue-400" />
            </div>
            <div className="p-5">
              <RiVercelFill size={60} />
            </div>
          </div>
          <TH4>Bought to you by</TH4>
          <div className="w-full flex justify-evenly overflow-x-scroll">
            <div className="p-5">
              <TH1 className="size-15 text-red-500 flex items-center">
                vstaffs
              </TH1>
            </div>
            <div className="p-5">
              <RiAlibabaCloudFill size={60} className="text-orange-400" />
            </div>
            <div className="p-5">
              <RiNodejsFill size={60} className="text-green-600" />
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <TH4>Contributors</TH4>
            <div className="flex -space-x-2">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/maxleiter.png"
                  alt="@maxleiter"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>
                  <TMuted>+</TMuted>
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
        {/* <div className='w-full h-200'>
                    <ShowcaseCarousel />
                </div> */}
        <div className="w-full sm:h-200 p-10 flex flex-col gap-20">
          <div>
            <TH4>Pricing</TH4>
            <TPara className="mt-2!">
              You can also host Walker yourself using the community client at
              @walker/client
            </TPara>
          </div>
          <div className="w-full flex flex-col sm:flex-row gap-10 justify-center">
            <div className="h-120 min-w-80 rounded-2xl border-2 border-gray-50 shadow-sm flex flex-col gap-10 p-10 bg-white">
              <div className="w-full flex justify-between items-center">
                <TLarge>Free</TLarge>
                <span className="flex items-baseline">
                  <TLarge className="mr-2">$0</TLarge>
                  <TMuted>forever</TMuted>
                </span>
              </div>
              <TPara className="mt-0!">Start walking</TPara>
              <div className="w-full h-full overflow-x-scroll">
                <TList
                  list={[
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                  ]}
                />
              </div>
            </div>
            <div className="h-120 min-w-80 rounded-2xl border-2 border-gray-50 shadow-sm flex flex-col gap-10 p-10 bg-white">
              <div className="w-full flex justify-between items-center">
                <TLarge>Paid</TLarge>
                <span className="flex items-baseline">
                  <TLarge className="mr-2">$1</TLarge>
                  <TMuted>per credit</TMuted>
                </span>
              </div>
              <TPara className="mt-0!">Walk the web</TPara>
              <div className="w-full h-full overflow-x-scroll">
                <TList
                  list={[
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                  ]}
                />
              </div>
            </div>
            <div className="h-120 min-w-80 rounded-2xl border-2 border-gray-50 shadow-sm flex flex-col gap-10 p-10 bg-white">
              <div className="w-full flex justify-between items-center">
                <TLarge>Enterprise</TLarge>
                <Button>
                  <TSmall>Try</TSmall>
                  <TSmall className="text-red-500">Concierge</TSmall>
                </Button>
              </div>
              <TPara className="mt-0!">Walk the Earth</TPara>
              <div className="w-full h-full overflow-x-scroll">
                <TList
                  list={[
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                    'Feature 1',
                  ]}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full h-100 bg-black flex flex-col justify-between py-5">
          <div className="flex items-center gap-2">
            <div className="size-10 bg-white"></div>
            <TH1 className="text-white">Walker</TH1>
          </div>
          <div className="w-full flex justify-center">
            <TSmall className="text-white">MIT License @2025</TSmall>
          </div>
        </div>
      </div>
    </div>
  );
}
