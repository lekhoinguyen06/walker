import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ReactNode, useState } from "react"
import { Button } from '@/components/ui/button';
import { RiAddLine, RiSubtractLine } from "@remixicon/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PopoverAddToCart({ children }: { children: ReactNode }) {
    const [count, setCount] = useState(0);
  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-40" align="start">
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Label>Discount Code</Label>
                <div className="flex justify-between items-center">
                    <span>{count} item(s)</span>
                    <div className="flex gap-2">
                        <Button onClick={() => setCount(count + 1)} variant="outline" size='icon-xs'><RiAddLine /></Button>
                        <Button onClick={() => (count > 0) ? setCount(count - 1) : null} variant="outline" size='icon-xs'><RiSubtractLine /></Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="hashtag">Discount Code</Label>
                <Input id="hashtag" placeholder="#CHRISMAS" />
            </div>
            <div className="flex flex-col gap-2">
                <Button variant="outline">Add</Button>
                <Button variant="outline">Checkout</Button>
            </div>
        </div>
        </PopoverContent>
    </Popover>
  )
}
