import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Dispatch, SetStateAction } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Map } from "./Map";
import { Input } from "./Input";

export function DevPortalModal({
  open,
  setOpen,
  trigger,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  trigger: React.ReactElement;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger render={trigger} />
        <DialogContent className="max-w-none! overflow-scroll">
          <DialogHeader>
            <DialogTitle className="text-2xl font-brand">
              Dev Portal
            </DialogTitle>
            <DialogDescription>
              Inspect, debug, and manage your Walker App.
            </DialogDescription>
          </DialogHeader>
          <div className="w-full">
            <Tabs defaultValue="overview">
              <TabsList variant="default">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="map">Map</TabsTrigger>
                <TabsTrigger value="manual">Manual</TabsTrigger>
                <TabsTrigger value="inspect">Inspect</TabsTrigger>
              </TabsList>
              <TabsContent value="chat" className="size-full"></TabsContent>
              <TabsContent value="map" className="size-full">
                <Map />
              </TabsContent>
              <TabsContent value="manual" className="size-full">
                <Input />
              </TabsContent>
              <TabsContent value="inspect" className="size-full"></TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
