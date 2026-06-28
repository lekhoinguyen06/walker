import { Button } from './ui/button';

export default function Header() {
  return (
    <header className="flex w-full p-4 max-w-4xl rounded-[12px] justify-between items-center backdrop-blur-2xl">
      <img src="/walker.svg" alt="Walker Logo" className="h-6" />
      <div className="flex gap-3">
        <Button variant="ghost" size="lg" className="rounded-full">
          Docs
        </Button>
        <Button variant="ghost" size="lg" className="rounded-full">
          Github
        </Button>
        <Button variant="ghost" size="lg" className="rounded-full">
          Community
        </Button>
        <Button variant="ghost" size="lg" className="rounded-full">
          Try <img src="/concierge-inline.svg" alt="Concierge Inline Logo" />
        </Button>
      </div>
    </header>
  );
}
