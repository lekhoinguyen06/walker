import Header from './components/Header';
import ReactLogo from './assets/react.svg?react';
import TypescriptLogo from './assets/typescript.svg?react';

function App() {
  return (
    <div className="flex flex-col gap-12 items-center">
      <Header />

      <div className="relative flex flex-col w-full justify-end items-center">
        <div className="relative size-full min-h-180 flex flex-col justify-end items-center">
          <img
            src="/yellow.svg"
            alt="Yellow Background"
            className="absolute top-0 left-0 size-full"
          />
          <div className="flex flex-col gap-12 items-center justify-center mb-24 z-1">
            <div className="font-brand">Walk the web, walk the earth.</div>
            <div className="flex gap-12 items-center">
              <ReactLogo className="h-6 fill-[#61DAFB]" />
              <TypescriptLogo className="h-6 fill-[#3178C6]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
