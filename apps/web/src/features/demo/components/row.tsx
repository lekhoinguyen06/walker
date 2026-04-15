import React from "react";
import slugify from 'slugify';
import { BaseItem } from "@repo/react";

export function Row({
  children,
  header,
}: {
  children: React.ReactNode;
  header: string;
}) {
  return (
    <BaseItem itemKey={`row-${slugify(header)}`}>
      <div className="w-full flex flex-col gap-8 mb-16">
        <span className="text-title-h5">{header}</span>
        <div className="flex gap-10 w-full overflow-x-scroll">{children}</div>
      </div>
    </BaseItem>
  );
}