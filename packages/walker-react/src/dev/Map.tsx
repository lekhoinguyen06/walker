import { useRuntime } from "@/RuntimeProvider";
import type { ItemType, MapType } from "walker-core";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, type Dispatch, type SetStateAction } from "react";
import { cn } from "@/lib/utils";
import { create } from "zustand";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useScreenSize } from "./dev.hook";

type SelectedItemStoreType = {
  selectedItem: ItemType | null;
  setSelectedItem: (item: ItemType | null) => void;
};

const useSelectedItemStore = create<SelectedItemStoreType>((set) => ({
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
}));

const iconStyles = "size-3 shrink-0" as const;

type MapItemProps = {
  item: ItemType & { children?: MapType };
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
};

export function MapItemIcon({
  item,
  isCollapsed,
  setIsCollapsed,
}: MapItemProps) {
  const hasChildren =
    item.children !== undefined && Object.keys(item.children).length > 0;
  const handleCollapse = hasChildren
    ? () => setIsCollapsed((prev) => !prev)
    : () => {};
  switch (item.type) {
    case "app":
      return (
        <div
          className={cn(
            iconStyles,
            "group-hover:bg-red-300 bg-red-200",
            hasChildren && "hover:h-1.5 hover:cursor-pointer",
            isCollapsed && "h-1.5",
          )}
          onClick={handleCollapse}
        ></div>
      );
    case "page":
      return (
        <div
          className={cn(
            iconStyles,
            "group-hover:bg-yellow-300 bg-yellow-200",
            hasChildren && "hover:h-1.5 hover:cursor-pointer",
            isCollapsed && "h-1.5",
          )}
          onClick={handleCollapse}
        ></div>
      );
    case "item":
      return (
        <div
          className={cn(
            iconStyles,
            "group-hover:bg-green-300 bg-green-200",
            hasChildren && "hover:h-1.5 hover:cursor-pointer",
            isCollapsed && "h-1.5",
          )}
          onClick={handleCollapse}
        ></div>
      );
  }
}

export function MapItemContent({
  item,
}: {
  item: ItemType & { children?: MapType };
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { selectedItem, setSelectedItem } = useSelectedItemStore();

  return (
    <>
      <div
        key={item.id}
        className={cn(
          "w-full flex gap-3 items-center group hover:bg-accent",
          selectedItem?.id === item.id && "bg-accent",
        )}
        onClick={() => setSelectedItem(item)}
      >
        <MapItemIcon
          item={item}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
        <div className="text-xs font-semibold text-nowrap">{item.id}</div>
        <div className="text-xs text-nowrap">{item.description}</div>
      </div>
      {item.children && !isCollapsed && (
        <div className="ml-3">
          <MapItem map={item.children} />
        </div>
      )}
    </>
  );
}

export function MapItem({ map }: { map: MapType }) {
  return (
    <>
      {Object.values(map).map((item) => (
        <MapItemContent item={item} />
      ))}
    </>
  );
}

export type MapProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export function MapPanel({ isOpen, setIsOpen }: MapProps) {
  const { runtime } = useRuntime();
  const map = runtime.map();
  const { selectedItem, setSelectedItem } = useSelectedItemStore();
  const { isMobile } = useScreenSize();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-none sm:max-w-none max-h-none w-[80vw] flex flex-col">
        <DialogHeader>
          <DialogTitle>Map</DialogTitle>
          <DialogDescription>
            <span className="text-xs">View your app's current landscape.</span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full h-[60vh] border rounded-[12px]">
          <div
            className={cn(
              "w-full p-3 overflow-scroll",
              selectedItem && isMobile && "hidden",
            )}
          >
            <MapItem map={map} />
          </div>
          {selectedItem && (
            <div className="relative w-full sm:min-w-[40vw] min-w-full p-3 sm:border-l">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1.5 right-1.5 rounded-none"
                onClick={() => setSelectedItem(null)}
              >
                <X />
              </Button>
              {Object.entries(selectedItem).map(([key, value]) => (
                <div key={key} className="pb-3">
                  <div className="text-xs font-light">{key}</div>
                  <div className="text-sm">{String(value)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function isValidJson(value: unknown): boolean {
  if (typeof value !== "string") {
    return false;
  }
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
}
