import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Construction } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router";

export function Building() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Construction />
        </EmptyMedia>
        <EmptyTitle>Under Construction</EmptyTitle>
        <EmptyDescription>
          This feature is currently under development.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link to="https://github.com/lekhoinguyen06/walker" target="_blank">
          <Button variant="outline">
            <img src="/github.png" className="size-4" />
            Give us feedback on GitHub
          </Button>
        </Link>
      </EmptyContent>
    </Empty>
  );
}
