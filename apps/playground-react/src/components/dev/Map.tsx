import { useRuntime, type MapType } from "@walker/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function MapItem({ map }: { map: MapType }) {
  return (
    <>
      {Object.keys(map).map((item) => (
        <>
          <div key={item} className="w-full flex gap-3 items-center group">
            {map[item].type == "app" && (
              <div className="aspect-square size-2 group-hover:bg-red-300 bg-red-200 rounded-sm"></div>
            )}
            {map[item].type == "page" && (
              <div className="aspect-square size-2 group-hover:bg-yellow-300 bg-yellow-200 rounded-sm"></div>
            )}
            {map[item].type == "item" && (
              <div className="aspect-square size-2 group-hover:bg-green-300 bg-green-200 rounded-sm"></div>
            )}
            <div className="text-xs font-semibold text-nowrap">
              {map[item].id}
            </div>
            <div className="text-xs text-nowrap">{map[item].description}</div>
            {/* <div className="text-xs text-nowrap font-light">
              {map[item].content}
            </div> */}
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

export function Map() {
  const { runtime } = useRuntime();
  const map = runtime.map();
  console.log("map", map);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Map</CardTitle>
        <CardDescription>Your Walker map</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="size-full overflow-scroll">
          <MapItem map={map} />
        </div>
      </CardContent>
    </Card>
  );
}
