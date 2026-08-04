import { Button } from "./ui/button";

const components: { label: string; href: string }[] = [
  { label: "Input", href: "/input" },
  { label: "Button", href: "/button" },
  { label: "Select", href: "/select" },
  { label: "Dialog", href: "/dialog" },
  { label: "Scroll Area", href: "/scroll-area" },
  { label: "Toast", href: "/toast" },
];

export function Components() {
  return (
    <div className="w-full grid grid-cols-3 max-w-2xl gap-6">
      {components.map((component) => (
        <a href={component.href}>
          <Button
            variant="ghost"
            size="lg"
            className="rounded-none w-full justify-start"
          >
            {component.label}
          </Button>
        </a>
      ))}
    </div>
  );
}
