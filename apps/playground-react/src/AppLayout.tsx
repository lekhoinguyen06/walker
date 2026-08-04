import { Outlet } from "react-router";
import Header from "./components/Header";
import { Toaster } from "./components/ui/toast";
import { Item } from "@repo/react";

function AppLayout() {
  return (
    <div className="w-full min-h-screen justify-center flex flex-col gap-24 p-24 items-center overflow-y-scroll">
      <Header />
      <Outlet />
      <Item
        id="toast-container"
        description="The container for toast notifications. It is recommended to place this at the root of your application."
      >
        <Toaster />
      </Item>
    </div>
  );
}

export default AppLayout;
