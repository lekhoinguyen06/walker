import { Outlet } from "react-router";
import Header from "./components/Header";
import { Toaster } from "./components/ui/toast";
import { Item } from "walker-react";
import { Panel } from "walker-react/dev";

// Pinning ts to lower version to avoid issues with tsup and react types.

function AppLayout() {
  return (
    <div className="w-full min-h-dvh justify-center flex flex-col lg:gap-24 md:gap-12 gap-6 lg:p-24 md:p-12 p-6 items-center overflow-y-scroll">
      <Header />
      <Outlet />
      <Item
        id="toast-container"
        description="The container for toast notifications. It is recommended to place this at the root of your application."
        scope="inactive"
      >
        <Toaster />
      </Item>
      <Panel url={process.env.VITE_WALK_API_URL} />
    </div>
  );
}

export default AppLayout;
