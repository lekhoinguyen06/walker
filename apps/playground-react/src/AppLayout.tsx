import { Outlet } from "react-router";
import Header from "./components/Header";
import { Toaster } from "./components/ui/toast";
import { Item } from "@repo/react";
import { Controls } from "./components/concierge/Controls";

function AppLayout() {
  return (
    <div className="w-full min-h-screen justify-center flex flex-col lg:gap-24 md:gap-12 gap-6 lg:p-24 md:p-12 p-6 items-center overflow-y-scroll">
      <Header />
      <Outlet />
      <Item
        id="toast-container"
        description="The container for toast notifications. It is recommended to place this at the root of your application."
      >
        <Toaster />
      </Item>
      <Controls devMode={true} />
    </div>
  );
}

export default AppLayout;
