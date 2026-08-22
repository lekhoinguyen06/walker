import { useRuntime } from "@/RuntimeProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { MapType } from "walker-core";

export function MapItem({ map }: { map: MapType }) {
  return (
    <>
      {Object.values(map).map((item) => (
        <>
          <div key={item.id} className="w-full flex gap-3 items-center group">
            {item.type == "app" && (
              <div className="aspect-square size-2 group-hover:bg-red-300 bg-red-200 rounded-sm"></div>
            )}
            {item.type == "page" && (
              <div className="aspect-square size-2 group-hover:bg-yellow-300 bg-yellow-200 rounded-sm"></div>
            )}
            {item.type == "item" && (
              <div className="aspect-square size-2 group-hover:bg-green-300 bg-green-200 rounded-sm"></div>
            )}
            <div className="text-xs font-semibold text-nowrap">{item.id}</div>
            <div className="text-xs text-nowrap">{item.description}</div>
            {/* <div className="text-xs text-nowrap font-light">
              {item.content}
            </div> */}
          </div>
          {item.children && (
            <div className="ml-3">
              <MapItem map={item.children} />
            </div>
          )}
        </>
      ))}
    </>
  );
}

export function Map() {
  const { runtime } = useRuntime();
  const map = runtime.map();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Map</CardTitle>
        <CardDescription>
          <span className="text-xs">View your app's current landscape.</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="size-full overflow-scroll">
        <MapItem map={map} />
      </CardContent>
    </Card>
  );
}
