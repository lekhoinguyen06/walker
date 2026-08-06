import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRuntime, type ItemType } from "@repo/react";
import type { Dispatch, SetStateAction } from "react";

export function MapItem({ map }: { map: Record<string, ItemType> }) {
  return (
    <>
      {Object.keys(map).map((item) => (
        <>
          <div key={item} className="w-full flex gap-3">
            <div className="text-xs font-semibold text-nowrap">
              {map[item].id}
            </div>
            <div className="text-xs text-nowrap">{map[item].description}</div>
            <div className="text-xs text-nowrap text-muted">
              {map[item].content}
            </div>
          </div>
          {map[item].children && (
            <div className="ml-3">
              <MapItem map={map[item].children} />
            </div>
          )}
        </>
      ))}
    </>
  );
}

export function MapModal({
  open,
  setOpen,
  trigger,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  trigger: React.ReactElement;
}) {
  const runtime = useRuntime();
  const map = runtime.map().map;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger render={trigger} />
        <DialogContent className="w-fit! max-w-full!">
          <DialogHeader>
            <DialogTitle>Map</DialogTitle>
            <DialogDescription>Your Walker map</DialogDescription>
          </DialogHeader>
          <div className="w-full overflow-scroll">
            <MapItem map={map} />
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
