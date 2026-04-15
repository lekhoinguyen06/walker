import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ReactNode } from "react"

type CartProp = { children: ReactNode, open: boolean, setOpen: (open: boolean) => void };

export function Cart({ children, open, setOpen }: CartProp) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>
            Your shopping cart.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
            {/* Content */}
        </div>
        <SheetFooter>
          <Button type="submit" size="lg">Checkout</Button>
          <div className="flex justify-between gap-2">
            <Button variant="destructive" size="sm" className="flex flex-1">Discard</Button>
            <SheetClose asChild>
                <Button variant="outline" size="sm" className="flex flex-1">Continue shopping</Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
