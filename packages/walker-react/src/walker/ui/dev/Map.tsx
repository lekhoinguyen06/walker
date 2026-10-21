import type { ItemType, MapItemType, MapType } from "walker-core";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { cn } from "@/lib/utils";
import { create } from "zustand";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRuntime } from "@/walker/hooks";
import { Details } from "./Details";
import { PanelDialog } from "../panel/PanelDialog";
import {
  PANEL_DIALOG_REGISTRY,
  usePanelDialog,
} from "@/walker/hooks/usePanelDialog";

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
    case "link":
      return (
        <div
          className={cn(
            iconStyles,
            "group-hover:bg-blue-300 bg-blue-200",
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
  item: MapItemType & { children?: MapType };
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
        <div
          className={cn(
            "text-xs text-nowrap",
            item.isInActiveScope && "font-semibold",
          )}
        >
          {item.id}
        </div>
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

export function MapDialog() {
  const { runtime } = useRuntime();
  const [map, setMap] = useState<MapType>({});
  const { selectedItem, setSelectedItem } = useSelectedItemStore();
  const { closeDialog } = usePanelDialog();

  useEffect(() => {
    setMap(runtime.map());
  }, [runtime]);
  return (
    <PanelDialog dialog={PANEL_DIALOG_REGISTRY.map}>
      <div className="size-full p-1.5">
        <div className="flex flex-col w-full h-120 bg-white dark:bg-black rounded-[16px] overflow-hidden">
          <div className="relative w-full p-3">
            <div className="font-brand">Map</div>
            <div className="text-xs">View your app's current landscape.</div>
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
            <div className="relative w-full p-3 overflow-scroll scrollbar-none">
              {selectedItem ? (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1.5 right-1.5"
                    onClick={() => setSelectedItem(null)}
                  >
                    <X />
                  </Button>
                  <Details item={selectedItem} />
                </>
              ) : (
                <MapItem map={map} />
              )}
            </div>
          </div>
        </div>
      </div>
    </PanelDialog>
  );
}
