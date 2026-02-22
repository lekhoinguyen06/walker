import {
  TH1,
  TH4,
  TMuted,
} from '@/components/ui/typo';
import {
  RiAlibabaCloudFill,
  RiAlipayFill,
  RiGitlabFill,
  RiLinkedinBoxFill,
  RiMetaFill,
  RiNetflixFill,
  RiNodejsFill,
  RiNotionFill,
  RiOpenaiFill,
  RiVercelFill,
} from '@remixicon/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Header } from '@/features/components/header';
import { Footer } from '@/features/components/footer';
import { Pricing } from '../components/pricing';

export function LandingPage() {
  return (
    <div className="w-screen h-screen p-0 m-0 flex flex-col items-center overflow-x-hidden">
      <Header />
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
        <Pricing />
        <Footer />
      </div>
    </div>
  );
}
