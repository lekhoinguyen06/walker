import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Dispatch, SetStateAction } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map } from "./Map";
import { Input } from "./Input";
import { Chat } from "./Chat";
import { Building } from "@/components/Building";
import { Peek } from "./Peek";

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
      <DialogTrigger render={trigger} />
      <DialogContent className="w-[90vw] h-fit max-h-[80vh] max-w-none! overflow-scroll flex flex-col gap-3">
        <DialogHeader>
          <DialogTitle className="text-2xl font-brand">Dev Portal</DialogTitle>
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
              <TabsTrigger value="peek">Peek</TabsTrigger>
              <TabsTrigger value="document">Document</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="size-full">
              <Chat />
            </TabsContent>
            <TabsContent value="map" className="size-full">
              <Map />
            </TabsContent>
            <TabsContent value="manual" className="size-full">
              <Input />
            </TabsContent>
            <TabsContent value="peek" className="size-full">
              <Peek />
            </TabsContent>
            <TabsContent value="document" className="size-full">
              <Building />
            </TabsContent>
            <TabsContent value="history" className="size-full">
              <Building />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
