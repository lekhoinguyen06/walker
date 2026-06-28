import Header from './components/Header';
import ReactLogo from './assets/react.svg?react';
import TypescriptLogo from './assets/typescript.svg?react';
import Merchandise from './components/Merchandise';
import SpreadSheet from './components/SpreadSheet';
import YellowBackground from './assets/yellow.svg?react';
import YellowLightBackground from './assets/yellow-light.svg?react';

function App() {
  return (
    <div className="w-full flex flex-col gap-48 items-center bg-background">
      <div className=" w-full flex flex-col lg:gap-48 gap-24 items-center max-w-6xl px-6">
        <Header />

        {/* Hero Section */}
        <div className="relative size-full min-h-180 flex flex-col justify-end items-center mt-24">
          <YellowBackground
            className="absolute inset-0 size-full object-fill"
            preserveAspectRatio="none"
          />
          <div className="flex flex-col gap-6 items-center justify-center mb-24 z-1">
            <div className="font-brand text-black">
              Walk the web, walk the earth.
            </div>
            <div className="flex gap-6 items-center">
              <ReactLogo className="h-6 fill-[#61DAFB]" />
              <TypescriptLogo className="h-6 fill-[#3178C6]" />
            </div>
          </div>
        </div>

        {/* Sponsors */}
        <div className="relative size-full min-h-140 flex flex-col justify-center items-center">
          <YellowLightBackground
            className="absolute inset-0 size-full object-fill"
            preserveAspectRatio="none"
          />
          <img src="/vstaffs.svg" alt="Vstaffs Logo" className="z-1" />
        </div>

        {/* Merchandise */}
        <div className="flex flex-col gap-12 w-full ">
          <div className="font-brand text-2xl">Merchandise</div>
          <div className="p-2 h-120 flex gap-6 overflow-x-scroll no-scrollbar">
            <Merchandise
              title="T Shirt"
              description="A comfortable cotton t-shirt with the Walker logo."
              image="/image.png"
            />
            <Merchandise
              title="Shorts"
              description="A comfortable pair of shorts with the Walker logo."
              image="/image.png"
            />
            <Merchandise
              title="Cup"
              description="A stylish cup with the Walker logo."
              image="/image.png"
            />
            <Merchandise
              title="Hoodie"
              description="A cozy hoodie with the Walker logo."
              image="/image.png"
            />
            <Merchandise
              title="Sticker"
              description="A fun sticker with the Walker logo."
              image="/image.png"
            />
            <Merchandise
              title="NFT"
              description="A unique digital collectible with the Walker logo."
              image="/image.png"
            />
            <Merchandise
              title="Hat"
              description="A stylish hat with the Walker logo."
              image="/image.png"
            />
            <Merchandise
              title="Socks"
              description="A comfortable pair of socks with the Walker logo."
              image="/image.png"
            />
          </div>
        </div>

        {/* Spreadsheet */}
        <div className="flex flex-col gap-12 w-full">
          <div className="font-brand text-2xl">Spreadsheet</div>
          <SpreadSheet />
        </div>
      </div>
      {/* Footer */}
      <div className="w-full min-h-60 lg:min-h-180 flex flex-col justify-end items-center bg-black dark:border-t border-white/20">
        <div className="font-brand text-white">MIT License 2026</div>
      </div>
    </div>
  );
}

export default App;
