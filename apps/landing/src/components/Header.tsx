import { Button } from './ui/button';

export default function Header() {
  return (
    <header className="fixed z-50 top-0 right-auto left-auto flex w-full p-4 max-w-4xl rounded-[12px] justify-between items-center backdrop-blur-sm bg-white/50 border border-gray-100/50">
      <img src="/walker.svg" alt="Walker Logo" className="h-6" />
      <div className="flex gap-3">
        <a href="https://walker.vstaffs.com/docs">
          <Button variant="ghost" size="lg" className="rounded-none">
            Docs
          </Button>
        </a>
        <a href="https://github.com/lekhoinguyen06/walker">
          <Button variant="ghost" size="lg" className="rounded-none">
            Github
          </Button>
        </a>
        <Button variant="ghost" size="lg" className="rounded-none">
          Community
        </Button>
        <a href="https://concierge.vstaffs.com">
          <Button
            variant="ghost"
            size="lg"
            className="rounded-none hover:bg-red-50"
          >
            Try <img src="/concierge-inline.svg" alt="Concierge Inline Logo" />
          </Button>
        </a>
      </div>
    </header>
  );
}
