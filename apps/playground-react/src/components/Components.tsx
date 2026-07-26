import { Button } from "./ui/button";

const components: { label: string; href: string }[] = [
  { label: "Input", href: "/input" },
  { label: "Button", href: "/button" },
  { label: "Checkbox", href: "/checkbox" },
  { label: "Combobox", href: "/combobox" },
  { label: "Dialog", href: "/dialog" },
  { label: "Date Picker", href: "/date-picker" },
  { label: "Drawer", href: "/drawer" },
  { label: "Dropdown Menu", href: "/dropdown-menu" },
  { label: "Input", href: "/input" },
  { label: "Popover", href: "/popover" },
  { label: "Scroll Area", href: "/scroll-area" },
  { label: "Select", href: "/select" },
  { label: "Sheet", href: "/sheet" },
  { label: "Slider", href: "/slider" },
  { label: "Textarea", href: "/textarea" },
  { label: "Toast", href: "/toast" },
  { label: "Tooltip", href: "/tooltip" },
  { label: "Toggle", href: "/toggle" },
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
