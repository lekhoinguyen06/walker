import Header from "./components/Header";
import ReactLogo from "./assets/react.svg?react";
import TypescriptLogo from "./assets/typescript.svg?react";

function App() {
  return (
    <div className="w-full flex flex-col items-center bg-background">
      <Header />
      <div className=" w-full flex flex-col lg:gap-48 gap-12 items-center max-w-6xl lg:mb-49 mb-12">
        <div className="w-full h-screen flex flex-col dark:gap-6">
          <div className="relative flex-1 flex flex-col justify-end items-center mt-24">
            <img
              src="/yellow.png"
              alt="Yellow Background"
              className="hidden sm:block absolute inset-0 size-full object-fill dark:bg-yellow-100 dark:rounded-[24px]"
            />
            <img
              src="/yellow-mobile.png"
              alt="Yellow Background"
              className="block sm:hidden absolute inset-0 size-full object-fill dark:bg-yellow-100 dark:rounded-[24px]"
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
          <div className="relative lg:p-24 p-12 flex flex-col justify-center items-center px-6">
            <img
              src="/yellow-light.png"
              alt="Yellow Background"
              className="hidden sm:block absolute inset-0 size-full object-fill dark:bg-yellow-50 dark:rounded-[24px]"
            />
            <img
              src="/yellow-light-mobile.png"
              alt="Yellow Background"
              className="block sm:hidden absolute inset-0 size-full object-fill dark:bg-yellow-50 dark:rounded-[24px]"
            />
            <img
              src="/vstaffs.svg"
              alt="Vstaffs Logo"
              className="z-1 lg:h-8 h-6"
            />
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="w-full flex flex-col justify-end items-center min-h-screen">
        <div className="font-brand">MIT License 2026</div>
      </div>
    </div>
  );
}

export default App;
