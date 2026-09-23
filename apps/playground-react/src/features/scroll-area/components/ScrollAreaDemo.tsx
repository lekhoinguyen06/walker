import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Item } from "walker-react";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

export function ScrollAreaDemo() {
  const [selectedVersion, setselectedVersion] = React.useState<
    string | undefined
  >(undefined);
  return (
    <div className="flex flex-col gap-3">
      {selectedVersion && (
        <div className="px-3 text-sm font-brand">{selectedVersion}</div>
      )}
      <ScrollArea className="h-72 w-48 rounded-md border">
        <Item
          id="tags"
          description="A list of tags. Please choose one of them."
        >
          <div className="p-4">
            <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
            {tags.map((tag) => (
              <React.Fragment key={tag}>
                <Item id={tag} description={`Version: ${tag}`}>
                  <div
                    className="text-sm"
                    onClick={() => setselectedVersion(tag)}
                  >
                    {tag}
                  </div>
                </Item>
                <Separator className="my-2" />
              </React.Fragment>
            ))}
          </div>
        </Item>
      </ScrollArea>
    </div>
  );
}
