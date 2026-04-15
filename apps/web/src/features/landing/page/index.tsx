import { Header } from '@/features/components/header';
import { Footer } from '@/features/components/footer';
import { Chat } from '@/features/components/chat';
import { useState } from 'react';
import { useScreenSize } from '@/hooks/useScreenSize';
import Trigger from '@/features/components/chat/trigger';
import { TechStack } from '../components/tech-stack';
import { InstallationTerminal } from '../components/terminal';

const message = `
The idea is simple. How can we help backend agents to see what the user see?
The world works on DOM elements, so we send it to our agents. 
The Walker library helps your agents be interactive, deliver user the experience tailored to your imagination. 
Guiding users, state aware, trained to use your web, and any other thing we can imagine. 
Build with us, and walk the earth!
`

export function LandingPage() {
  const [open, setOpen] = useState(false);
  const { isSmall } = useScreenSize();
  return (
    <div className="w-screen h-screen p-0 m-0 flex flex-col items-center overflow-x-hidden">
      <Header />
      <Trigger setOpen={setOpen} />
      <Chat open={open} setOpen={setOpen} />
      <div className="w-full max-w-300 flex flex-col gap-20">
        <div className="relative w-full h-110 bg-amber-200 mt-10">
          <div className="absolute bottom-0 right-0 flex flex-col items-end">
            <span className="text-title-h5 text-white mr-10 mb-2">
              An open-source front-end library to propel an AI-human driven
              UI/UX future.
            </span>
            <span className="text-title-h1 text-white">Walk the earth...</span>
          </div>
        </div>
        {isSmall ? (
          <>
          <span className="text-paragraph-sm px-2 text-justify">
            {message}
          </span>
          <div className="w-full p-10 flex flex-col gap-20">
            <InstallationTerminal />
            <TechStack />
          </div>
          </>
        ) : (
          <>
          <span className="text-title-h5 text-justify">
            {message}
          </span>
          <div className="w-full p-10 flex gap-20">
            <InstallationTerminal />
            <TechStack />
          </div>
          </>
        )}
        {/* <div className="w-full h-200 p-10 flex flex-col gap-20">
          <span className="text-title-h5">Trusted by top teams</span>
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
          <span className="text-title-h5">Bought to you by</span>
          <div className="w-full flex justify-evenly overflow-x-scroll">
            <div className="p-5">
              <span className="text-title-h1 size-15 text-red-500 flex items-center">
                vstaffs
              </span>
            </div>
            <div className="p-5">
              <RiAlibabaCloudFill size={60} className="text-orange-400" />
            </div>
            <div className="p-5">
              <RiNodejsFill size={60} className="text-green-600" />
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <span className="text-title-h5">Contributors</span>
            <div className="flex -space-x-2">
              <Avatar>
                <AvatarImage
                  src="https://github.com/lekhoinguyen06.png"
                  alt="@lekhoinguyen06"
                />
                <AvatarFallback>L</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/maxleiter.png"
                  alt="@maxleiter"
                />
                <AvatarFallback>ML</AvatarFallback>
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
                  <span className="text-muted">+</span>
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div> */}
        {/* <Pricing /> */}
        <Footer />
      </div>
    </div>
  );
}
