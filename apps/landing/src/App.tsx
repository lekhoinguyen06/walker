import Header from './components/Header';
import ReactLogo from '../public/react.svg?react';
import TypescriptLogo from '../public/typescript.svg?react';
import Merchandise from './components/Merchandise';
import SpreadSheet from './components/SpreadSheet';

function App() {
  return (
    <div className="w-full flex flex-col lg:gap-48 gap-12 items-center bg-background">
      <div className=" w-full flex flex-col lg:gap-48 gap-12 items-center max-w-6xl">
        <Header />

        <div className="w-full h-screen flex flex-col dark:gap-6">
          {/* Hero Section */}
          <div className="relative flex-1 flex flex-col justify-end items-center mt-24">
            <img
              src="/yellow.png"
              alt="Yellow Background"
              className="absolute inset-0 size-full object-fill dark:bg-yellow-100 dark:rounded-[24px]"
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
          <div className="relative lg:p-24 p-12 flex flex-col justify-center items-center px-6">
            <img
              src="/yellow-light.png"
              alt="Yellow Background"
              className="absolute inset-0 size-full object-fill dark:bg-yellow-50 dark:rounded-[24px]"
            />
            <img
              src="/vstaffs.svg"
              alt="Vstaffs Logo"
              className="z-1 lg:h-8 h-6"
            />
          </div>
        </div>

        {/* Merchandise */}
        <div className="flex flex-col gap-12 w-full px-6">
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
        <div className="flex flex-col gap-12 w-full px-6">
          <div className="font-brand text-2xl">Spreadsheet</div>
          <SpreadSheet />
        </div>
      </div>
      {/* Footer */}
      <div className="w-full flex flex-col justify-end items-center">
        <div className="font-brand">MIT License 2026</div>
      </div>
    </div>
  );
}

export default App;
