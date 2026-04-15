import { RiShoppingBag3Line } from "@remixicon/react";
import { BaseItem } from "@repo/react";
import { Button } from '@/components/ui/button';
import slugify from 'slugify';
import { CardProp } from "@/types/card";
import { PopoverAddToCart } from "./popover";

export function Card({ title, price }: CardProp) {
  const key = `shopping-item-${slugify(title)}`;
  return (
    <BaseItem itemKey={key}>
      <div className="flex flex-col gap-4 min-w-60 min-h-60 p-4 border-2 border-gray-50 shadow-sm rounded-2xl my-4 justify-between">
        <div className="w-full aspect-square bg-slate-50"></div>
        <span className="text-label-md">{title}</span>
        <div className="flex justify-between items-center gap-4">
          <span className="text-label-sm">${price}</span>
          <PopoverAddToCart>
            <Button>
              <RiShoppingBag3Line />
            </Button>
          </PopoverAddToCart>
        </div>
      </div>
    </BaseItem>
  );
}