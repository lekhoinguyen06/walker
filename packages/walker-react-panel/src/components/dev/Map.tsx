import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Details } from "./Details";
import { PanelDialog } from "../panel/PanelDialog";
import { usePanelDialog } from "@/hooks";
import { mapper } from "walker-dom";
import type { ItemType, MapType } from "walker-shared";

export function MapDialog() {
  const { closeDialog } = usePanelDialog();
  const [map, setMap] = useState<MapType | undefined>(undefined);
  const [selectedItem, setSelectedItem] = useState<ItemType | undefined>(
    undefined,
  );
  const handleMap = () => {
    const map = mapper();
    setMap(map);
  };

  useEffect(() => {
    handleMap();
  }, []);
  return (
    <PanelDialog dialog={"map"}>
      <div className="size-full">
        <div className="flex flex-col w-full h-120">
          <div className="w-full p-3">
            <div className="font-brand">Map</div>
            <div className="text-xs">View your application Items.</div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3"
              onClick={closeDialog}
            >
              <X />
            </Button>
          </div>
          <div className="flex size-full overflow-hidden">
            <div className="relative size-full flex flex-col p-3 gap-3 overflow-scroll scrollbar-none">
              {selectedItem ? (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1.5 right-1.5"
                    onClick={() => setSelectedItem(undefined)}
                  >
                    <ChevronLeft />
                  </Button>
                  <Details item={selectedItem} />
                </>
              ) : (
                <div>
                  {map?.map((i) => (
                    <div
                      className={cn(
                        "w-full flex gap-3 items-center hover:bg-accent hover:cursor-pointer",
                      )}
                      onClick={() => setSelectedItem(i)}
                    >
                      <span className="text-xs font-semibold text-nowrap">
                        {i.id}
                      </span>
                      <span className="text-xs text-nowrap">
                        {i.description}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PanelDialog>
  );
}
