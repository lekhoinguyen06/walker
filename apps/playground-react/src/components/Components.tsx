import { Item } from "walker-react";
import { Button } from "./ui/button";
import { ade } from "@/walker/ade";

const components = [
  { label: "Input", href: "/input", ade: ade.pci },
  { label: "Select", href: "/select", ade: ade.pcs },
  { label: "Dialog", href: "/dialog", ade: ade.pcd },
  { label: "Scroll Area", href: "/scroll-area", ade: ade.pcsa },
  { label: "Toast", href: "/toast", ade: ade.pct },
];

export function Components() {
  return (
    <div className="w-full grid grid-cols-3 max-w-2xl gap-6">
      {components.map((component) => (
        <Item {...component.ade} key={component.href}>
          <a href={component.href}>
            <Button
              variant="ghost"
              size="lg"
              className="rounded-none w-full justify-start text-foreground"
            >
              {component.label}
            </Button>
          </a>
        </Item>
      ))}
    </div>
  );
}
