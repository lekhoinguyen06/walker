import Header from './components/Header';
import ReactLogo from './assets/react.svg?react';
import TypescriptLogo from './assets/typescript.svg?react';

function App() {
  return (
    <div className="absolute w-full flex flex-col gap-24 items-center">
      <Header />

      {/* Hero Section */}
      <div className="relative size-full min-h-180 flex flex-col justify-end items-center mt-24">
        <img
          src="/yellow.svg"
          alt="Yellow Background"
          className="absolute top-0 left-0 size-full"
        />
        <div className="flex flex-col gap-6 items-center justify-center mb-24 z-1">
          <div className="font-brand">Walk the web, walk the earth.</div>
          <div className="flex gap-6 items-center">
            <ReactLogo className="h-6 fill-[#61DAFB]" />
            <TypescriptLogo className="h-6 fill-[#3178C6]" />
          </div>
        </div>
      </div>

      {/* Sponsors */}
      <div className="relative size-full min-h-140 flex flex-col justify-center items-center">
        <img
          src="/yellow-light.svg"
          alt="Yellow Light Background"
          className="absolute top-0 left-0 size-full"
        />
        <img src="/vstaffs.svg" alt="Vstaffs Logo" className="h-6 z-1" />
      </div>

      {/* Footer */}
      <div className="w-full min-h-140 flex flex-col justify-between items-center px-24 bg-foreground">
        <div className="w-full">
          <img src="/walker-light.svg" alt="Walker Logo" className="h-6" />
        </div>
        <div className="font-brand text-white">MIT License 2026</div>
      </div>
    </div>
  );
}

export default App;
