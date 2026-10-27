import Header from "./components/Header";
import ReactLogo from "./assets/react.svg?react";
import TypescriptLogo from "./assets/typescript.svg?react";

function App() {
  return (
    <div className="w-full flex flex-col items-center bg-background">
      <Header />
      <div className=" w-full flex flex-col lg:gap-48 gap-12 items-center max-w-6xl lg:mb-49 mb-12">
        <div className="w-full h-dvh flex flex-col">
          <div className="relative flex-1 flex flex-col justify-end items-center mt-24">
            <div className="absolute inset-0 size-full object-fill bg-yellow-100"></div>
            <div className="flex flex-col gap-6 items-center justify-center mb-24 z-1">
              <div className="font-brand text-black text-lg">
                Walk the web, walk the earth.
              </div>
              <div className="flex gap-6 items-center">
                <ReactLogo className="h-6 fill-[#61DAFB]" />
                <TypescriptLogo className="h-6 fill-[#3178C6]" />
              </div>
            </div>
          </div>
          <div className="relative lg:p-24 p-12 flex flex-col justify-center items-center px-6">
            <div className="absolute inset-0 size-full object-fill bg-yellow-50"></div>
            <img
              src="/vstaffs.svg"
              alt="Vstaffs Logo"
              className="z-1 lg:h-8 h-6"
            />
          </div>
        </div>
      </div>

      {/* Random */}
      <div className="w-full flex flex-col justify-center items-center min-h-dvh">
        <div className="flex flex-wrap gap-12 justify-center items-center">
          <img
            src="/frame-01.svg"
            alt="Frame 01"
            className="lg:h-24 md:h-12 h-6"
          />
          <img
            src="/frame-02.svg"
            alt="Frame 01"
            className="lg:h-24 md:h-12 h-6"
          />
          <img
            src="/frame-03.svg"
            alt="Frame 01"
            className="lg:h-24 md:h-12 h-6"
          />
          <img
            src="/frame-04.svg"
            alt="Frame 01"
            className="lg:h-24 md:h-12 h-6"
          />
          <img
            src="/frame-05.svg"
            alt="Frame 01"
            className="lg:h-24 md:h-12 h-6"
          />
        </div>
      </div>
      {/* Footer */}
      <div className="w-full flex flex-col justify-end items-center min-h-dvh">
        <div className="relative w-full lg:h-128 h-64 flex flex-col items-center overflow-hidden">
          <span className="absolute b-0 left-1/2 -translate-x-1/2 font-brand lg:text-[512px] text-[256px]">
            WALKER
          </span>
        </div>
        <div className="w-full flex flex-col items-center font-brand bg-orange-300">
          MIT License 2026
        </div>
      </div>
    </div>
  );
}

export default App;
